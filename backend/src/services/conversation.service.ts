import { Role } from "@prisma/client";
import {
  ConversationListItemDto,
  ConversationLastMessageDto,
  ConversationOtherPartyDto,
  MessageDto,
} from "../dto/conversation.dto";
import { ListQueryDto } from "../dto";
import { IConversationService, StartConversationResult } from "../interfaces/conversation.interface";
import { IPrismaService } from "../interfaces/prisma.interface";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors";
import { PaginatedResponse } from "../types";

export class ConversationService implements IConversationService {
  constructor(private prismaService: IPrismaService) {}

  async listMyConversations(
    userId: string,
    freelancerId: string | null,
    role: Role,
    query: ListQueryDto,
  ): Promise<PaginatedResponse<ConversationListItemDto>> {
    const where =
      role === Role.USER
        ? { userId }
        : { freelancerId: freelancerId! };

    const page = query.pagination?.page ?? 1;
    const pageSize = query.pagination?.pageSize ?? 20;
    const skip = (page - 1) * pageSize;

    const sortField = query.sort?.[0]?.field ?? "updatedAt";
    const sortDirection = query.sort?.[0]?.direction ?? "desc";
    const orderBy =
      sortField === "updatedAt"
        ? { updatedAt: sortDirection as "asc" | "desc" }
        : { updatedAt: "desc" as const };

    const [conversations, totalItems] = await Promise.all([
      this.prismaService.conversation.findMany({
        where,
        orderBy,
        skip,
        take: pageSize,
        include: {
          user: { select: { id: true, name: true } },
          freelancer: { select: { id: true, user: { select: { name: true } } } },
          messages: {
            orderBy: { createdAt: "desc" },
            take: 1,
            select: { body: true, createdAt: true },
          },
        },
      }),
      this.prismaService.conversation.count({ where }),
    ]);

    const data: ConversationListItemDto[] = conversations.map((c) => {
      const lastMsg = c.messages[0];
      const otherParty: ConversationOtherPartyDto =
        role === Role.USER
          ? { id: c.freelancer.id, name: c.freelancer.user.name }
          : { id: c.user.id, name: c.user.name };
      const lastMessage: ConversationLastMessageDto | undefined = lastMsg
        ? { body: lastMsg.body, createdAt: lastMsg.createdAt }
        : undefined;
      return {
        id: c.id,
        otherParty,
        lastMessage,
        updatedAt: c.updatedAt,
      };
    });
    const totalPages = Math.ceil(totalItems / pageSize);
    return {
      data,
      meta: {
        page,
        pageSize,
        totalItems,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async getByFreelancer(
    userId: string,
    freelancerId: string,
  ): Promise<ConversationListItemDto | null> {
    const c = await this.prismaService.conversation.findUnique({
      where: { userId_freelancerId: { userId, freelancerId } },
      include: {
        user: { select: { id: true, name: true } },
        freelancer: { select: { id: true, user: { select: { name: true } } } },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: { body: true, createdAt: true },
        },
      },
    });
    if (!c) return null;
    const lastMsg = c.messages[0];
    const otherParty: ConversationOtherPartyDto = {
      id: c.freelancer.id,
      name: c.freelancer.user.name,
    };
    const lastMessage: ConversationLastMessageDto | undefined = lastMsg
      ? { body: lastMsg.body, createdAt: lastMsg.createdAt }
      : undefined;
    return {
      id: c.id,
      otherParty,
      lastMessage,
      updatedAt: c.updatedAt,
    };
  }

  async startConversation(
    userId: string,
    freelancerId: string,
    text: string,
  ): Promise<StartConversationResult> {
    const existing = await this.prismaService.conversation.findUnique({
      where: { userId_freelancerId: { userId, freelancerId } },
      include: { messages: { orderBy: { createdAt: "desc" }, take: 1 } },
    });

    if (existing) {
      const firstMessage = existing.messages[0];
      if (firstMessage && firstMessage.senderUserId === userId) {
        throw new BadRequestError(
          "You have already sent the first message. Wait for the freelancer to reply.",
        );
      }
      if (firstMessage) {
        throw new BadRequestError(
          "Conversation already exists. Use the conversation thread to send messages.",
        );
      }
    }

    const conversation = await this.prismaService.$transaction(async (tx) => {
      const conv =
        existing ??
        (await tx.conversation.create({
          data: { userId, freelancerId },
        }));
      const message = await tx.message.create({
        data: {
          conversationId: conv.id,
          senderUserId: userId,
          body: text,
        },
      });
      await tx.conversation.update({
        where: { id: conv.id },
        data: { updatedAt: new Date() },
      });
      return { conversation: conv, message };
    });

    const messageDto: MessageDto = {
      id: conversation.message.id,
      body: conversation.message.body,
      senderUserId: conversation.message.senderUserId,
      createdAt: conversation.message.createdAt,
      isFromSelf: true,
    };

    return {
      conversationId: conversation.conversation.id,
      message: messageDto,
    };
  }

  async getMessages(
    conversationId: string,
    userId: string,
    freelancerId: string | null,
    role: Role,
    since?: string,
    limit: number = 20,
  ): Promise<MessageDto[]> {
    const conv = await this.prismaService.conversation.findUnique({
      where: { id: conversationId },
    });
    if (!conv) throw new NotFoundError("Conversation not found");
    const isParticipant =
      role === Role.USER
        ? conv.userId === userId
        : conv.freelancerId === freelancerId;
    if (!isParticipant) throw new ForbiddenError("Not a participant in this conversation");

    const sinceDate = since ? new Date(since) : undefined;
    const isValidSince = sinceDate && !isNaN(sinceDate.getTime());

    const messages = await this.prismaService.message.findMany({
      where: {
        conversationId,
        ...(isValidSince ? { createdAt: { gt: sinceDate } } : {}),
      },
      orderBy: { createdAt: "asc" },
      take: limit,
    });

    return messages.map((m) => ({
      id: m.id,
      body: m.body,
      senderUserId: m.senderUserId,
      createdAt: m.createdAt,
      isFromSelf: m.senderUserId === userId,
    }));
  }

  private async canSend(
    conversationId: string,
    senderUserId: string,
    senderRole: Role,
  ): Promise<{ allowed: boolean }> {
    const conv = await this.prismaService.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: { orderBy: { createdAt: "desc" }, take: 1 },
      },
    });
    if (!conv) throw new NotFoundError("Conversation not found");

    const isUserParticipant = conv.userId === senderUserId;
    const freelancer = await this.prismaService.freelancer.findUnique({
      where: { id: conv.freelancerId },
      select: { userId: true },
    });
    const isFreelancerParticipant = freelancer?.userId === senderUserId;
    if (!isUserParticipant && !isFreelancerParticipant) {
      throw new ForbiddenError("Not a participant in this conversation");
    }

    const count = await this.prismaService.message.count({
      where: { conversationId },
    });
    const lastMessage = conv.messages[0];

    if (count === 0) {
      return { allowed: senderRole === Role.USER };
    }
    if (count === 1 && lastMessage) {
      const lastSenderIsUser = lastMessage.senderUserId === conv.userId;
      if (lastSenderIsUser) {
        return { allowed: senderRole === Role.FREELANCER };
      }
    }
    return { allowed: true };
  }

  async sendMessage(
    conversationId: string,
    senderUserId: string,
    senderRole: Role,
    text: string,
  ): Promise<MessageDto> {
    const { allowed } = await this.canSend(conversationId, senderUserId, senderRole);
    if (!allowed) {
      throw new BadRequestError(
        "You can only send one message to start. Wait for the freelancer to reply.",
      );
    }

    const conv = await this.prismaService.conversation.findUnique({
      where: { id: conversationId },
    });
    if (!conv) throw new NotFoundError("Conversation not found");

    const message = await this.prismaService.$transaction(async (tx) => {
      const msg = await tx.message.create({
        data: {
          conversationId,
          senderUserId,
          body: text,
        },
      });
      await tx.conversation.update({
        where: { id: conversationId },
        data: { updatedAt: new Date() },
      });
      return msg;
    });

    return {
      id: message.id,
      body: message.body,
      senderUserId: message.senderUserId,
      createdAt: message.createdAt,
      isFromSelf: true,
    };
  }
}

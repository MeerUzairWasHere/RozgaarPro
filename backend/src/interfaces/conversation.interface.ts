import { Role } from "@prisma/client";
import {
  ConversationListItemDto,
  MessageDto,
} from "../dto/conversation.dto";
import { ListQueryDto } from "../dto";
import { PaginatedResponse } from "../types";

export interface StartConversationResult {
  conversationId: string;
  message: MessageDto;
}

export interface IConversationService {
  listMyConversations(
    userId: string,
    freelancerId: string | null,
    role: Role,
    query: ListQueryDto,
  ): Promise<PaginatedResponse<ConversationListItemDto>>;

  getByFreelancer(
    userId: string,
    freelancerId: string,
  ): Promise<ConversationListItemDto | null>;

  startConversation(
    userId: string,
    freelancerId: string,
    text: string,
  ): Promise<StartConversationResult>;

  getMessages(
    conversationId: string,
    userId: string,
    freelancerId: string | null,
    role: Role,
    since?: string,
    limit?: number,
  ): Promise<MessageDto[]>;

  sendMessage(
    conversationId: string,
    senderUserId: string,
    senderRole: Role,
    text: string,
  ): Promise<MessageDto>;
}

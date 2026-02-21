import { Role } from "@prisma/client";
import {
  ConversationListItemDto,
  MessageDto,
} from "../dto/conversation.dto";

export interface StartConversationResult {
  conversationId: string;
  message: MessageDto;
}

export interface IConversationService {
  listMyConversations(
    userId: string,
    freelancerId: string | null,
    role: Role,
  ): Promise<ConversationListItemDto[]>;

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

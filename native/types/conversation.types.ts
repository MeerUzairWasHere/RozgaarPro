export interface ConversationOtherParty {
  id: string;
  name: string;
}

export interface ConversationLastMessage {
  body: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  otherParty: ConversationOtherParty;
  lastMessage?: ConversationLastMessage;
  updatedAt: string;
}

export interface Message {
  id: string;
  body: string;
  senderUserId: string;
  createdAt: string;
  isFromSelf: boolean;
}

export interface StartConversationResult {
  conversationId: string;
  message: Message;
}

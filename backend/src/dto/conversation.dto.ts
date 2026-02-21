export interface ConversationOtherPartyDto {
  id: string;
  name: string;
}

export interface ConversationLastMessageDto {
  body: string;
  createdAt: Date;
}

export interface ConversationListItemDto {
  id: string;
  otherParty: ConversationOtherPartyDto;
  lastMessage?: ConversationLastMessageDto;
  updatedAt: Date;
}

export interface MessageDto {
  id: string;
  body: string;
  senderUserId: string;
  createdAt: Date;
  isFromSelf: boolean;
}

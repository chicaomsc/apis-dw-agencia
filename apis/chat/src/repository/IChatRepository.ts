import { ChatMessage } from "../models/ChatMessage";

export interface IChatRepository {
  save(chat: ChatMessage): Promise<ChatMessage>;
  findByClientId(clientId: string): Promise<ChatMessage[]>;
}

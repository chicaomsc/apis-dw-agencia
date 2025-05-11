import { ChatMessage } from "../models/ChatMessage";

export interface IChatService {
  createMessage(data: ChatMessage): Promise<ChatMessage>;
  getMessagesByClient(clientId: string): Promise<ChatMessage[]>;
}

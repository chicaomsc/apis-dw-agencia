import { IChatService } from "./IChatService";
import { ChatMessage } from "../models/ChatMessage";
import { IChatRepository } from "../repository/IChatRepository";

export class ChatService implements IChatService {
  private chatRepository: IChatRepository;

  constructor(chatRepository: IChatRepository) {
    this.chatRepository = chatRepository;
  }

  async createMessage(data: ChatMessage): Promise<ChatMessage> {
    return await this.chatRepository.save(data);
  }

  async getMessagesByClient(clientId: string): Promise<ChatMessage[]> {
    return await this.chatRepository.findByClientId(clientId);
  }
}

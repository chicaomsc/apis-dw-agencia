import { IChatRepository } from "./IChatRepository";
import { ChatMessage } from "../models/ChatMessage";
import { ChatModel } from "../models/ChatModel";

export class ChatRepository implements IChatRepository {
  async save(chat: ChatMessage): Promise<ChatMessage> {
    const created = await ChatModel.create({
      userId: chat.userId,
      clientId: chat.clientId,
      channel: chat.channel,
      messageIn: chat.messageIn,
      messageOut: chat.messageOut,
      contextSnapshot: chat.contextSnapshot,
    });

    return new ChatMessage({
      id: created.id,
      userId: created.userId,
      clientId: created.clientId,
      channel: created.channel,
      messageIn: created.messageIn,
      messageOut: created.messageOut,
      contextSnapshot: created.contextSnapshot,
      createdAt: created.createdAt,
    });
  }

  async findByClientId(clientId: string): Promise<ChatMessage[]> {
    const rows = await ChatModel.findAll({
      where: { clientId },
      order: [["createdAt", "ASC"]],
    });

    return rows.map(
      (row) =>
        new ChatMessage({
          id: row.id,
          userId: row.userId,
          clientId: row.clientId,
          channel: row.channel,
          messageIn: row.messageIn,
          messageOut: row.messageOut,
          contextSnapshot: row.contextSnapshot,
          createdAt: row.createdAt,
        })
    );
  }
}

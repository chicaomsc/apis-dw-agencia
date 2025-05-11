import { Request, Response } from "express";
import { ChatService } from "../services/ChatService";
import { ChatMessage } from "../models/ChatMessage";
import { ChatRepository } from "../repository/ChatRepository";

export class ChatController {
  private chatService: ChatService;

  constructor() {
    const repository = new ChatRepository();
    this.chatService = new ChatService(repository);
  }

  createMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        userId,
        clientId,
        channel,
        messageIn,
        messageOut,
        contextSnapshot,
      } = req.body;

      const chat = new ChatMessage({
        userId,
        clientId,
        channel,
        messageIn,
        messageOut,
        contextSnapshot,
      });

      const created = await this.chatService.createMessage(chat);
      res.status(201).json(created);
    } catch (err) {
      console.error("[ChatController] Error:", err);
      res.status(500).json({ error: "Erro ao salvar mensagem" });
    }
  };

  getMessagesByClient = async (req: Request, res: Response): Promise<void> => {
    try {
      const { clientId } = req.params;
      const messages = await this.chatService.getMessagesByClient(clientId);
      res.status(200).json(messages);
    } catch (err) {
      console.error("[ChatController] Error:", err);
      res.status(500).json({ error: "Erro ao buscar histórico" });
    }
  };
}

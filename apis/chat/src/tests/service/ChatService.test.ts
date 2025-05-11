import { ChatMessage } from "../../models/ChatMessage";
import { IChatRepository } from "../../repository/IChatRepository";
import { ChatService } from "../../services/ChatService";

const mockChatRepository: jest.Mocked<IChatRepository> = {
  save: jest.fn(),
  findByClientId: jest.fn(),
};

describe("ChatService - Unit Tests", () => {
  const service = new ChatService(mockChatRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar uma nova mensagem", async () => {
    const chatInput = new ChatMessage({
      userId: "user-123",
      clientId: "client-456",
      channel: "site",
      messageIn: "Olá",
      messageOut: "Oi, tudo bem?",
      contextSnapshot: { etapa: "inicial" },
    });

    const chatSaved = { ...chatInput, id: "uuid-789", createdAt: new Date() };
    mockChatRepository.save.mockResolvedValue(chatSaved);

    const result = await service.createMessage(chatInput);

    expect(mockChatRepository.save).toHaveBeenCalledWith(chatInput);
    expect(result.id).toBe("uuid-789");
    expect(result.messageIn).toBe("Olá");
  });

  it("deve retornar histórico por clientId", async () => {
    const chatHistory = [
      new ChatMessage({
        id: "1",
        userId: "user1",
        clientId: "client1",
        channel: "site",
        messageIn: "Oi",
        messageOut: "Olá!",
        contextSnapshot: {},
        createdAt: new Date(),
      }),
    ];

    mockChatRepository.findByClientId.mockResolvedValue(chatHistory);

    const result = await service.getMessagesByClient("client1");

    expect(mockChatRepository.findByClientId).toHaveBeenCalledWith("client1");
    expect(result.length).toBe(1);
    expect(result[0].messageIn).toBe("Oi");
  });
});

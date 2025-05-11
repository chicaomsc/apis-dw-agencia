import request from "supertest";
import app from "../../index";
import sequelize from "../../config/dbConfig";

describe("Chat API Integration", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("deve salvar uma nova mensagem de chat", async () => {
    const response = await request(app)
      .post("/api/chats")
      .send({
        userId: "11111111-1111-1111-1111-111111111111",
        clientId: "22222222-2222-2222-2222-222222222222",
        channel: "site",
        messageIn: "Olá",
        messageOut: "Oi, tudo bem?",
        contextSnapshot: { etapa: "inicial" },
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("deve retornar mensagens por clientId", async () => {
    const response = await request(app).get(
      "/api/chats/22222222-2222-2222-2222-222222222222"
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

import request from "supertest";
import { randomUUID } from "crypto";
import app from "../../index";
import sequelize from "../../config/dbConfig";

describe("Payment API Integration", () => {
  let userId: string;
  let clientId: string;
  let productId: string;
  let funnelId: string;
  let paymentId: string;

  beforeAll(async () => {
    await sequelize.sync({ force: true });

    userId = randomUUID();
    clientId = randomUUID();
    productId = randomUUID();
    funnelId = randomUUID();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("POST /api/payments - deve criar um pagamento", async () => {
    const response = await request(app).post("/api/payments").send({
      userId,
      clientId,
      productId,
      funnelId,
      amount: 150.0,
      method: "pix",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    paymentId = response.body.id;
  });

  it("POST /api/payments/:id/confirm - deve confirmar pagamento", async () => {
    const response = await request(app)
      .post(`/api/payments/${paymentId}/confirm`)
      .send({
        gatewayId: "mock-gateway-id-123",
        paidAt: new Date().toISOString(),
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Pagamento confirmado");
  });
});

import request from "supertest";
import express from "express";
import funnelRoutes from "../../routes/funnel.routes";
import sequelize from "../../config/dbConfig";

const app = express();
app.use(express.json());
app.use("/api", funnelRoutes);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Funnel Routes Integration", () => {
  let clientId: string;
  let userId: string;

  beforeEach(() => {
    clientId = "11111111-1111-1111-1111-111111111111";
    userId = "22222222-2222-2222-2222-222222222222";
  });

  it("should create a new funnel", async () => {
    const res = await request(app).post("/api/funnels").send({
      userId,
      clientId,
      step: "capturado",
      notes: "Lead capturado",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.step).toBe("capturado");
  });

  it("should get funnel by clientId", async () => {
    const res = await request(app).get(`/api/funnels/${clientId}`);
    expect(res.status).toBe(200);
    expect(res.body.clientId).toBe(clientId);
  });
});

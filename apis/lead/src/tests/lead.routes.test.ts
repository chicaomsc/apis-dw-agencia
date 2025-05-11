import request from "supertest";
import express from "express";
import leadRoutes from "../routes/lead.routes";
import cookieParser from "cookie-parser";
import CorsConfig from "../config/corsConfig";
import sequelize from "../config/dbConfig";
import { ClientModel } from "../models/ClientModel";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(CorsConfig);

app.get("/api", (req, res) => {
  res.status(200).send("dw agencia - User API online and routing");
});

app.use("/api", leadRoutes);

let clientId: string;

beforeAll(async () => {
  await sequelize.sync({ force: true });

  const client = await ClientModel.create({
    name: "DW Agência Digital",
    type: "agencia",
    settings: { bot_name: "Laura" },
  });

  clientId = client.id;
});

describe("Lead API", () => {
  it("GET /api - deve retornar status 200", async () => {
    const res = await request(app).get("/api");
    expect(res.status).toBe(200);
    expect(res.text).toContain("dw agencia");
  });

  it("POST /api/users - deve criar um lead", async () => {
    const leadData = {
      name: "Chicão Teste",
      phone: "999999999",
      source: "Testes",
      client_id: clientId,
    };

    const res = await request(app).post("/api/users").send(leadData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(leadData.name);
    expect(res.body.phone).toBe(leadData.phone);
  });
});

afterAll(async () => {
  await sequelize.close();
});

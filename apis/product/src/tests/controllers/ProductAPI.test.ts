import request from "supertest";
import app from "../../index";
import sequelize from "../../config/dbConfig";

describe("Product API Integration Tests", () => {
  let createdProductId: string;

  afterAll(async () => {
    await sequelize.close();
  });

  it("GET /api/products - deve retornar lista de produtos", async () => {
    const response = await request(app).get("/api/products");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("POST /api/products - deve criar um novo produto", async () => {
    const productData = {
      clientId: "123e4567-e89b-12d3-a456-426614174000",
      name: "Teste Produto",
      description: "Descrição do teste",
      price: 123.45,
      category: "Teste",
    };

    const response = await request(app).post("/api/products").send(productData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(productData.name);

    // Armazena o ID para os próximos testes
    createdProductId = response.body.id;
  });

  it("PUT /api/products/:id - deve atualizar o produto", async () => {
    const updatedData = {
      name: "Produto Atualizado",
      price: 200.0,
    };

    const response = await request(app)
      .put(`/api/products/${createdProductId}`)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedData.name);
    expect(Number(response.body.price)).toBe(updatedData.price);
  });

  it("DELETE /api/products/:id - deve excluir o produto", async () => {
    const response = await request(app).delete(
      `/api/products/${createdProductId}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Produto excluído com sucesso"
    );
  });

  it("GET /api/products/:id - deve retornar 404 após exclusão", async () => {
    const response = await request(app).get(
      `/api/products/${createdProductId}`
    );

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Produto não encontrado");
  });
});

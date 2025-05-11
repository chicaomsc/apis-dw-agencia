import { ProductService } from "../../services/ProductService";
import { mock } from "jest-mock-extended";
import { Product } from "../../models/Product";
import { IProductRepository } from "../../repository/IProductRepository";

describe("ProductService", () => {
  const mockProductRepository = mock<IProductRepository>();
  const productService = new ProductService(mockProductRepository);

  const productMock: Product = new Product({
    id: "1",
    clientId: "123e4567-e89b-12d3-a456-426614174000",
    name: "Landing Page de Alta Conversão",
    description: "Criação de Landing Page otimizada para conversão.",
    price: 1500,
    category: "Web",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar todos os produtos", async () => {
    mockProductRepository.findAll.mockResolvedValue([productMock]);

    const result = await productService.getAllProducts();

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Landing Page de Alta Conversão");
    expect(mockProductRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("deve retornar um produto pelo ID", async () => {
    mockProductRepository.findById.mockResolvedValue(productMock);

    const result = await productService.getProductById("1");

    expect(result).toBeDefined();
    expect(result?.id).toBe("1");
    expect(result?.name).toBe("Landing Page de Alta Conversão");
    expect(mockProductRepository.findById).toHaveBeenCalledWith("1");
  });

  it("deve criar um novo produto", async () => {
    const productToCreate = new Product({
      clientId: "123e4567-e89b-12d3-a456-426614174000",
      name: "Robô Inteligente",
      description: "Automatiza atendimento com IA.",
      price: 3000,
      category: "Automação",
    });

    const createdProduct = new Product({
      ...productToCreate,
      id: "2",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockProductRepository.create.mockResolvedValue(createdProduct);

    const result = await productService.createProduct({
      clientId: productToCreate.clientId,
      name: productToCreate.name,
      description: productToCreate.description,
      price: productToCreate.price,
      category: productToCreate.category,
    });

    expect(result).toBeDefined();
    expect(result.id).toBe("2");
    expect(result.name).toBe("Robô Inteligente");
    expect(mockProductRepository.create).toHaveBeenCalledTimes(1);
  });

  it("deve atualizar um produto existente", async () => {
    const updatedProduct = new Product({
      ...productMock,
      name: "Landing Page Atualizada",
      price: 1800,
    });

    mockProductRepository.update.mockResolvedValue(updatedProduct);

    const result = await productService.updateProduct("1", {
      name: "Landing Page Atualizada",
      price: 1800,
    });

    expect(result).toBeDefined();
    expect(result?.name).toBe("Landing Page Atualizada");
    expect(result?.price).toBe(1800);
    expect(mockProductRepository.update).toHaveBeenCalledWith("1", {
      name: "Landing Page Atualizada",
      price: 1800,
    });
  });

  it("deve deletar um produto", async () => {
    mockProductRepository.delete.mockResolvedValue();

    await productService.deleteProduct("1");

    expect(mockProductRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockProductRepository.delete).toHaveBeenCalledWith("1");
  });
});

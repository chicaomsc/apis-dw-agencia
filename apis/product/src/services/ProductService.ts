import { Product } from "../models/Product";
import { CreateProductDTO } from "../dtos/CreateProductDTO";
import { IProductRepository } from "./IProductRepository";

export class ProductService {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productRepository.findAll();
    return products;
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = await this.productRepository.findById(id);
    return product;
  }

  async createProduct(data: CreateProductDTO): Promise<Product> {
    const newProduct = new Product({
      clientId: data.clientId,
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
    });

    const savedProduct = await this.productRepository.create(newProduct);
    return savedProduct;
  }

  async updateProduct(
    id: string,
    data: Partial<Product>
  ): Promise<Product | null> {
    return await this.productRepository.update(id, data);
  }

  async deleteProduct(id: string): Promise<boolean> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      return false;
    }
    await this.productRepository.delete(id);
    return true;
  }
}

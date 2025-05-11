import { Product } from "../models/Product";

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
  update(id: string, product: Partial<Product>): Promise<Product | null>;
}

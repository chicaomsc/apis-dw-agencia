import { Product } from "../models/Product";
import { ProductModel } from "../models/ProductModel";
import { IProductRepository } from "./IProductRepository";

export class ProductRepository implements IProductRepository {
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();
    return products.map(
      (p) =>
        new Product({
          id: p.id,
          clientId: p.clientId,
          name: p.name,
          description: p.description,
          price: p.price,
          category: p.category,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
        })
    );
  }

  async findById(id: string): Promise<Product | null> {
    const product = await ProductModel.findByPk(id);
    if (!product) return null;

    return new Product({
      id: product.id,
      clientId: product.clientId,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  }

  async create(product: Product): Promise<Product> {
    const created = await ProductModel.create({
      clientId: product.clientId,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
    });

    return new Product({
      id: created.id,
      clientId: created.clientId,
      name: created.name,
      description: created.description,
      price: created.price,
      category: created.category,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  }

  async update(id: string, product: Partial<Product>): Promise<Product | null> {
    const [affectedRows] = await ProductModel.update(product, {
      where: { id },
    });

    if (affectedRows === 0) {
      return null;
    }

    const updatedProduct = await this.findById(id);
    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    await ProductModel.destroy({ where: { id } });
  }
}

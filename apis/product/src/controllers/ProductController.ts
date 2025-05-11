import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/ProductService";
import { CreateProductDTO } from "../dtos/CreateProductDTO";
import { ProductRepository } from "../repository/ProductRepository";

export class ProductController {
  private readonly productService: ProductService;

  constructor() {
    const productRepository = new ProductRepository();
    this.productService = new ProductService(productRepository);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json(products);
    } catch (error: any) {
      console.error("[ProductController Error - getAll]", error);
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id);

      if (!product) {
        res.status(404).json({ message: "Produto não encontrado" });
        return;
      }
      res.status(200).json(product);
    } catch (error: any) {
      console.error("[ProductController Error - getById]", error);
      res.status(500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = req.body as CreateProductDTO;

      const createdProduct = await this.productService.createProduct(data);

      res.status(201).json(createdProduct);
    } catch (error: any) {
      console.error("[ProductController Error - create]", error);
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedProduct = await this.productService.updateProduct(id, data);

      if (!updatedProduct) {
        res.status(404).json({ message: "Produto não encontrado" });
      }

      res.status(200).json(updatedProduct);
    } catch (error: any) {
      console.error("[ProductController Error - update]", error);
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.productService.deleteProduct(id);

      if (!deleted) {
        res.status(404).json({ message: "Produto não encontrado" });
      }

      res.status(200).json({ message: "Produto excluído com sucesso" });
    } catch (error: any) {
      console.error("[ProductController Error - delete]", error);
      res.status(500).json({ error: error.message });
    }
  }
}

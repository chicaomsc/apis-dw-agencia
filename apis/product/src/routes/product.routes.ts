import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const router = Router();
const productController = new ProductController();

router.get("/products", productController.getAll.bind(productController));
router.get("/products/:id", productController.getById.bind(productController));
router.post("/products", productController.create.bind(productController));
router.delete(
  "/products/:id",
  productController.delete.bind(productController)
);
router.put("/products/:id", productController.update.bind(productController));

export default router;

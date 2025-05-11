import { Router } from "express";
import { PaymentController } from "../controllers/PaymentController";

const router = Router();
const controller = new PaymentController();

router.post("/payments", controller.create.bind(controller));
router.post("/payments/:id/confirm", controller.confirm.bind(controller));

export default router;

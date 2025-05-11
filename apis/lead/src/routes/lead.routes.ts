import { Router } from "express";
import LeadController from "../controllers/usersController";

const router = Router();

router.post("/users", LeadController.create);
router.get("/users/:phone", LeadController.getByPhone);

export default router;

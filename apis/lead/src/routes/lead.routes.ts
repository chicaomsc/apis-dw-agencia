import { Router } from "express";
import LeadController from "../controllers/usersController";

const router = Router();

router.post("/leads", LeadController.create);
router.get("/leads/:phone", LeadController.getByPhone);

export default router;

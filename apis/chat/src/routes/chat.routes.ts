import { Router } from "express";
import { ChatController } from "../controllers/ChatController";

const router = Router();
const chatController = new ChatController();

router.post("/chats", chatController.createMessage);
router.get("/chats/:clientId", chatController.getMessagesByClient);

export default router;

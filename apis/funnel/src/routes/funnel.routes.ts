import { Router } from "express";
import { FunnelController } from "../controllers/FunnelController";

const router = Router();
const funnelController = new FunnelController();

router.post("/funnels", funnelController.upsertFunnel.bind(funnelController));

router.get(
  "/funnels/:clientId",
  funnelController.getFunnelByClient.bind(funnelController)
);

export default router;

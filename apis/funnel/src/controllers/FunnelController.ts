import { Request, Response } from "express";
import { FunnelService } from "../services/FunnelService";
import { FunnelRepository } from "../repository/FunnelRepository";

export class FunnelController {
  async upsertFunnel(req: Request, res: Response): Promise<void> {
    try {
      const funnelRepository = new FunnelRepository();
      const funnelService = new FunnelService(funnelRepository);

      const {
        userId,
        clientId,
        step,
        notes,
        paymentStatus,
        paymentMethod,
        paymentLink,
        paymentQrCode,
        paymentGatewayId,
      } = req.body;

      const funnel = await funnelService.upsertFunnel({
        userId,
        clientId,
        step,
        notes,
        paymentStatus,
        paymentMethod,
        paymentLink,
        paymentQrCode,
        paymentGatewayId,
      });

      res.status(200).json(funnel);
    } catch (error: any) {
      console.error("[FunnelController Error]", error);
      res.status(400).json({ error: error.message });
    }
  }

  async getFunnelByClient(req: Request, res: Response): Promise<void> {
    try {
      const { clientId } = req.params;

      const funnelRepository = new FunnelRepository();
      const funnelService = new FunnelService(funnelRepository);

      const funnel = await funnelService.getFunnelByClientId(clientId);

      if (!funnel) {
        res.status(404).json({ message: "Funnel não encontrado" });
      }

      res.status(200).json(funnel);
    } catch (error: any) {
      console.error("[FunnelController Error]", error);
      res.status(400).json({ error: error.message });
    }
  }
}

import { Request, Response } from "express";
import { PaymentService } from "../services/PaymentService";
import { PaymentRepository } from "../repository/PaymentRepository";

export class PaymentController {
  private paymentService = new PaymentService(new PaymentRepository());

  async create(req: Request, res: Response): Promise<void> {
    try {
      const payment = await this.paymentService.create(req.body);
      res.status(201).json(payment);
    } catch (error: any) {
      console.error("[PaymentController - create]", error);
      res.status(500).json({ error: error.message });
    }
  }

  async confirm(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { gatewayId, paidAt } = req.body;
      await this.paymentService.confirmPayment(id, gatewayId, new Date(paidAt));
      res.status(200).json({ message: "Pagamento confirmado" });
    } catch (error: any) {
      console.error("[PaymentController - confirm]", error);
      res.status(500).json({ error: error.message });
    }
  }
}

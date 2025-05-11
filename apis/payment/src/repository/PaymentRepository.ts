import { IPaymentRepository } from "./IPaymentRepository";
import { Payment } from "../models/Payment";
import { PaymentModel } from "../models/PaymentModel";

export class PaymentRepository implements IPaymentRepository {
  async create(payment: Payment): Promise<Payment> {
    const created = await PaymentModel.create({
      userId: payment.userId,
      clientId: payment.clientId,
      funnelId: payment.funnelId,
      productId: payment.productId,
      amount: payment.amount,
      method: payment.method,
      status: payment.status,
      gatewayId: payment.gatewayId,
      paymentLink: payment.paymentLink,
      qrCode: payment.qrCode,
      createdAt: payment.createdAt,
      paidAt: payment.paidAt,
    });

    return new Payment({
      id: created.id,
      userId: created.userId,
      clientId: created.clientId,
      funnelId: created.funnelId,
      productId: created.productId,
      amount: created.amount,
      method: created.method,
      status: created.status,
      gatewayId: created.gatewayId,
      paymentLink: created.paymentLink,
      qrCode: created.qrCode,
      createdAt: created.createdAt,
      paidAt: created.paidAt,
    });
  }

  async findById(id: string): Promise<Payment | null> {
    const found = await PaymentModel.findByPk(id);
    if (!found) return null;

    return new Payment({
      id: found.id,
      userId: found.userId,
      clientId: found.clientId,
      funnelId: found.funnelId,
      productId: found.productId,
      amount: found.amount,
      method: found.method,
      status: found.status,
      gatewayId: found.gatewayId,
      paymentLink: found.paymentLink,
      qrCode: found.qrCode,
      createdAt: found.createdAt,
      paidAt: found.paidAt,
    });
  }

  async updateStatus(
    id: string,
    status: "pending" | "paid" | "failed",
    paidAt?: Date
  ): Promise<void> {
    await PaymentModel.update(
      {
        status,
        paidAt: paidAt || undefined,
      },
      {
        where: { id },
      }
    );
  }
}

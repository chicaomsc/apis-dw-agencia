import { Payment } from "../models/Payment";

export interface IPaymentRepository {
  create(payment: Payment): Promise<Payment>;
  findById(id: string): Promise<Payment | null>;
  updateStatus(
    id: string,
    status: "pending" | "paid" | "failed",
    paidAt?: Date
  ): Promise<void>;
}

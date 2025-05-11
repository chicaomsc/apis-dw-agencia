import { CreatePaymentDTO } from "../dtos/CreatePaymentDTO";
import { Payment } from "../models/Payment";
import { IPaymentRepository } from "../repository/IPaymentRepository";

export class PaymentService {
  constructor(private paymentRepository: IPaymentRepository) {}

  async create(data: CreatePaymentDTO): Promise<Payment> {
    const payment = new Payment({
      ...data,
      status: "pending",
      createdAt: new Date(),
    });

    return await this.paymentRepository.create(payment);
  }

  async confirmPayment(
    id: string,
    gatewayId: string,
    paidAt: Date
  ): Promise<void> {
    await this.paymentRepository.updateStatus(id, "paid", paidAt);
  }

  async findById(id: string): Promise<Payment | null> {
    return await this.paymentRepository.findById(id);
  }
}

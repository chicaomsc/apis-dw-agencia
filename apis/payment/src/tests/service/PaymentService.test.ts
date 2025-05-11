import { mock } from "jest-mock-extended";
import { PaymentService } from "../../services/PaymentService";
import { IPaymentRepository } from "../../repository/IPaymentRepository";
import { Payment } from "../../models/Payment";

describe("PaymentService", () => {
  const mockRepo = mock<IPaymentRepository>();
  const service = new PaymentService(mockRepo);

  const fakePayment = new Payment({
    id: "pay123",
    userId: "user1",
    clientId: "client1",
    productId: "prod1",
    funnelId: "funnel1",
    amount: 150,
    method: "pix",
    status: "pending",
    createdAt: new Date(),
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar um pagamento", async () => {
    mockRepo.create.mockResolvedValue(fakePayment);

    const result = await service.create({
      userId: fakePayment.userId,
      clientId: fakePayment.clientId,
      productId: fakePayment.productId,
      funnelId: fakePayment.funnelId,
      amount: fakePayment.amount,
      method: fakePayment.method,
    });

    expect(result).toEqual(fakePayment);
    expect(mockRepo.create).toHaveBeenCalledTimes(1);
  });

  it("deve confirmar um pagamento", async () => {
    const now = new Date();
    await service.confirmPayment("pay123", "gtw123", now);
    expect(mockRepo.updateStatus).toHaveBeenCalledWith("pay123", "paid", now);
  });

  it("deve retornar um pagamento por id", async () => {
    mockRepo.findById.mockResolvedValue(fakePayment);
    const result = await service.findById("pay123");

    expect(result).toBeDefined();
    expect(result?.id).toBe("pay123");
    expect(mockRepo.findById).toHaveBeenCalledWith("pay123");
  });
});

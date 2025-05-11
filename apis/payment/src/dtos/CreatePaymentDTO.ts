export interface CreatePaymentDTO {
  userId: string;
  clientId: string;
  funnelId?: string;
  productId?: string;
  amount: number;
  method: "pix" | "card";
}

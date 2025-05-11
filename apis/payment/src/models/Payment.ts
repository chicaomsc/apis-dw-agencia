export class Payment {
  id?: string;
  userId!: string;
  clientId!: string;
  funnelId?: string;
  productId?: string;
  amount!: number;
  method!: "pix" | "card";
  status!: "pending" | "paid" | "failed";
  gatewayId?: string;
  paymentLink?: string;
  qrCode?: string;
  createdAt?: Date;
  paidAt?: Date;

  constructor(props: {
    id?: string;
    userId: string;
    clientId: string;
    funnelId?: string;
    productId?: string;
    amount: number;
    method: "pix" | "card";
    status: "pending" | "paid" | "failed";
    gatewayId?: string;
    paymentLink?: string;
    qrCode?: string;
    createdAt?: Date;
    paidAt?: Date;
  }) {
    Object.assign(this, props);
  }
}

export interface CreateOrUpdateFunnelDTO {
  id?: string;
  userId: string;
  clientId: string;
  step: string;
  notes?: string;
  paymentStatus?: string;
  paymentMethod?: string;
  paymentLink?: string;
  paymentQrCode?: string;
  paymentGatewayId?: string;
}

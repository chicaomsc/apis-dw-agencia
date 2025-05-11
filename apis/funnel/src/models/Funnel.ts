export class Funnel {
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
  updatedAt?: Date;

  constructor(props: {
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
    updatedAt?: Date;
  }) {
    this.id = props.id;
    this.userId = props.userId;
    this.clientId = props.clientId;
    this.step = props.step;
    this.notes = props.notes;
    this.paymentStatus = props.paymentStatus;
    this.paymentMethod = props.paymentMethod;
    this.paymentLink = props.paymentLink;
    this.paymentQrCode = props.paymentQrCode;
    this.paymentGatewayId = props.paymentGatewayId;
    this.updatedAt = props.updatedAt;
  }
}

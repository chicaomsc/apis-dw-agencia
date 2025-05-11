import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/dbConfig"; // ou dbConfig
import { Payment } from "./Payment";

interface PaymentCreationAttributes
  extends Optional<
    Payment,
    | "id"
    | "status"
    | "gatewayId"
    | "paymentLink"
    | "qrCode"
    | "createdAt"
    | "paidAt"
  > {}

export class PaymentModel
  extends Model<Payment, PaymentCreationAttributes>
  implements Payment
{
  public id!: string;
  public userId!: string;
  public clientId!: string;
  public funnelId?: string;
  public productId?: string;
  public amount!: number;
  public method!: "pix" | "card";
  public status!: "pending" | "paid" | "failed";
  public gatewayId?: string;
  public paymentLink?: string;
  public qrCode?: string;
  public createdAt!: Date;
  public paidAt?: Date;
}

PaymentModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id",
    },
    clientId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "client_id",
    },
    funnelId: {
      type: DataTypes.UUID,
      field: "funnel_id",
    },
    productId: {
      type: DataTypes.UUID,
      field: "product_id",
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "pending",
    },
    gatewayId: {
      type: DataTypes.STRING(100),
      field: "gateway_id",
    },
    paymentLink: {
      type: DataTypes.TEXT,
      field: "payment_link",
    },
    qrCode: {
      type: DataTypes.TEXT,
      field: "qr_code",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    paidAt: {
      type: DataTypes.DATE,
      field: "paid_at",
    },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "payments",
    timestamps: false,
  }
);

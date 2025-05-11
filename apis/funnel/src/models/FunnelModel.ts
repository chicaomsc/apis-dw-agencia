import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/dbConfig";

interface FunnelAttributes {
  id: string;
  user_id: string;
  client_id: string;
  step: string;
  notes?: string;
  payment_status?: string;
  payment_method?: string;
  payment_link?: string;
  payment_qr_code?: string;
  payment_gateway_id?: string;
  updated_at?: Date;
}

export interface FunnelCreationAttributes
  extends Optional<FunnelAttributes, "id"> {}

export class FunnelModel
  extends Model<FunnelAttributes, FunnelCreationAttributes>
  implements FunnelAttributes
{
  public id!: string;
  public user_id!: string;
  public client_id!: string;
  public step!: string;
  public notes?: string;
  public payment_status?: string;
  public payment_method?: string;
  public payment_link?: string;
  public payment_qr_code?: string;
  public payment_gateway_id?: string;
  public updated_at?: Date;
}

FunnelModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    client_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    step: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    payment_status: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    payment_method: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    payment_link: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    payment_qr_code: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    payment_gateway_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "funnels",
    timestamps: false,
  }
);

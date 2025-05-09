import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/dbConfig";

export interface ClientAttributes {
  id: string;
  name: string;
  type?: string;
  settings?: object;
  createdAt?: Date;
}

export interface ClientCreationAttributes
  extends Optional<ClientAttributes, "id" | "createdAt"> {}

export class ClientModel
  extends Model<ClientAttributes, ClientCreationAttributes>
  implements ClientAttributes
{
  public id!: string;
  public name!: string;
  public type?: string;
  public settings?: object;
  public createdAt?: Date;
}

ClientModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    settings: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "clients",
    timestamps: false,
  }
);

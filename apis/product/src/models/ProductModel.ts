import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/dbConfig";

interface ProductAttributes {
  id: string;
  clientId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductCreationAttributes
  extends Optional<ProductAttributes, "id"> {}

export class ProductModel
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: string;
  public clientId!: string;
  public name!: string;
  public description!: string;
  public price!: number;
  public category!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "client_id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at",
    },
  },
  {
    sequelize,
    tableName: "products",
    timestamps: true,
  }
);

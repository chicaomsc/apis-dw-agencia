import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/dbConfig";

interface ChatAttributes {
  id: string;
  userId: string;
  clientId: string;
  channel: string;
  messageIn: string;
  messageOut: string;
  contextSnapshot: object;
  createdAt?: Date;
}

interface ChatCreationAttributes extends Optional<ChatAttributes, "id"> {}

export class ChatModel
  extends Model<ChatAttributes, ChatCreationAttributes>
  implements ChatAttributes
{
  public id!: string;
  public userId!: string;
  public clientId!: string;
  public channel!: string;
  public messageIn!: string;
  public messageOut!: string;
  public contextSnapshot!: object;
  public readonly createdAt!: Date;
}

ChatModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    clientId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    channel: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    messageIn: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    messageOut: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    contextSnapshot: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "chat_history",
    timestamps: false,
  }
);

import { UserModel } from "../models/UserModel";
import { User } from "../models/User";
import { IUserRepository } from "./IUserRepository";

export class UserRespository implements IUserRepository {
  async create(user: User): Promise<User> {
    const created = await UserModel.create({
      name: user.name,
      phone: user.phone,
      source: user.source,
    });

    return new User({
      id: created.id,
      name: created.name,
      phone: created.phone,
      source: created.source,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  }

  async findByPhone(phone: string): Promise<User | null> {
    const found = await UserModel.findOne({ where: { phone } });
    if (!found) return null;

    return new User({
      id: found.id,
      name: found.name,
      phone: found.phone,
      source: found.source,
      createdAt: found.createdAt,
      updatedAt: found.updatedAt,
    });
  }
}

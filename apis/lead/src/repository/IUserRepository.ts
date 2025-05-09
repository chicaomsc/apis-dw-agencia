import { User } from "../models/User";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findByPhone(phone: string): Promise<User | null>;
}

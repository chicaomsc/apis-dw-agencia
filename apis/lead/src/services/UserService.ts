import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { User } from "../models/User";
import { IUserRepository } from "../repository/IUserRepository";

export class UserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(data: CreateUserDTO): Promise<User> {
    const { name, phone, source } = data;

    const existingUser = await this.userRepository.findByPhone(phone);
    if (existingUser) {
      throw new Error("Usúario já cadastrado.");
    }

    const user = new User({ name, phone, source });

    const createUser = await this.userRepository.create(user);

    return createUser;
  }

  async findUserByPhone(phone: string): Promise<User | null> {
    return await this.userRepository.findByPhone(phone);
  }
}

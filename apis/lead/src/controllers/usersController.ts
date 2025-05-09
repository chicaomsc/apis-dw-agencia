import { Request, Response } from "express";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UserRespository } from "../repository/UserRepository";
import { UserService } from "../services/UserService";

class UsersController {
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, phone, source } = req.body as CreateUserDTO;
      const userRespository = new UserRespository();
      const userService = new UserService(userRespository);
      const user = await userService.createUser({ name, phone, source });
      res.status(201).json(user);
    } catch (error: any) {
      console.error("[UsersController Error]", error);
      res.status(400).json({ error: error.message });
    }
  }

  static async getByPhone(req: Request, res: Response): Promise<void> {
    try {
      const { phone } = req.params;

      const userRespository = new UserRespository();
      const userService = new UserService(userRespository);

      const user = await userService.findUserByPhone(phone);

      if (!user) {
        res.status(404).json({ message: "Usúario não encontrado" });
      }

      res.status(200).json(user);
    } catch (error: any) {
      console.error("[UsersController Error]", error);
      res.status(400).json({ error: error.message });
    }
  }
}

export default UsersController;

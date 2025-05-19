import { Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserUpdateInputModel } from "../models/input/user/UserUpdateInputModel";

export class UserController {
  private readonly _service: UserService;

  constructor(service: UserService) {
    this._service = service;
  }

  update = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const input: UserUpdateInputModel = req.body;
    try {
      const result = await this._service.update(id, input);
      if (result) {
        res.status(200).json({ message: "Usuário atualizado com sucesso" });
      }
      else {
        res.status(500).json({ message: "Falha ao atualizar usuário" });
      }
    } catch (err: any) {
      if (err.id) {
        res.status(err.id).json({ message: err.msg });
      }
      else {
        res.status(500).json({ message: err });
      }
    }
  }
}
import { Request, Response } from "express";
import { UserUpdateInputModel } from "../models/input/user/UserUpdateInputModel";
import { IUserService } from "../services/interfaces/IUserService";
import { IUserFacade } from "../facades/interfaces/IUserFacade";

export class UserController {
  private readonly _service: IUserService;
  private readonly _userFacade: IUserFacade;

  constructor(
    service: IUserService,
    userFacade: IUserFacade) {
    this._service = service;
    this._userFacade = userFacade;
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

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.get("Token");
      const userViewModel = await this._userFacade.getUserByToken(token);
      res.status(200).json({ userViewModel });
    } catch (err: any) {
      if (err.id) {
        res.status(err.id).json({ message: err.msg });
      }
      else {
        res.status(500).json({ message: err });
      }
    }
  }

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.get("Token");
      await this._userFacade.delete(token);
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
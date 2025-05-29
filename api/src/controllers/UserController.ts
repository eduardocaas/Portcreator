import { Request, Response } from "express";
import { UserUpdateInputModel } from "../models/input/user/UserUpdateInputModel";
import { IUserService } from "../services/interfaces/IUserService";
import { IUserFacade } from "../facades/interfaces/IUserFacade";
import { IAuthService } from "../services/interfaces/IAuthService";
import fs from 'fs';
import path from 'path';

export class UserController {
  private readonly _authService: IAuthService;
  private readonly _service: IUserService;
  private readonly _userFacade: IUserFacade;

  constructor(
    authService: IAuthService,
    service: IUserService,
    userFacade: IUserFacade) {
    this._authService = authService;
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
      res.status(204).send();
    } catch (err: any) {
      if (err.id) {
        res.status(err.id).json({ message: err.msg });
      }
      else {
        res.status(500).json({ message: err });
      }
    }
  }

  image = async (req: Request, res: Response): Promise<void> => {
    try {
      const { file } = req;
      const token = req.get("Token");

      if (!file) {
        res.status(400).json({ message: "Nenhum arquivo foi enviado" });
        return;
      }

      const userId = this._authService.getIdByToken(token!);

      if (!userId) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }

      const fileExtension = path.extname(file.originalname);
      const newFileName = `${userId}${fileExtension}`;

      const newPath = path.join(file.destination, newFileName);
      fs.renameSync(file.path, newPath);

      await this._service.updateImage(userId, newPath);

      res.status(200).json({ message: "Imagem carregada com sucesso" });

    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}
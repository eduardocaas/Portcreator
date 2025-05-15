import { Request, Response } from "express";
import { IAuthService } from "../services/interfaces/IAuthService";

export class AuthController {
  private _service: IAuthService;

  constructor(service: IAuthService) {
    this._service = service;
  }

  signUp = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    try {
      const userPartial = this._service.signup({ name, email, password })
      res.status(201).json(userPartial);
    } catch (err: any) {
      res.status(err.id).json({ message: err.msg });
    }
  }
}
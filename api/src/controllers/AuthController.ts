import { Request, Response } from "express";
import { SignupInputModel } from "../models/input/user/SignupInputModel";
import { AuthService } from "../services/AuthService";

export class AuthController {
  private _service: AuthService;

  constructor(service: AuthService) {
    this._service = service;
  }

  signUp = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    try {
      if (!name || !email || !password) {
        res.status(400).json({ message: 'Campos obrigatórios: nome, email e senha' });
        return;
      }
      if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
        res.status(400).json({ message: 'Todos os campos devem ser strings' });
        return;
      }

      const signupInputModel = new SignupInputModel(name, email, password);
      
    } catch (err: any) {
      res.status(err.id).json({ message: err.msg });
      return;
    }
  }
}
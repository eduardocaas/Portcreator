import { Request, Response } from "express";
import { IAuthFacade } from "../facades/interfaces/IAuthFacade";

export class AuthController {
  private _facade: IAuthFacade;

  constructor(facade: IAuthFacade) {
    this._facade = facade;
  }

  signUp = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    try {
      const userPartial = this._facade.signup({ name, email, password })
      res.status(201).json(userPartial);
    } catch (err: any) {
      res.status(err.id).json({ message: err.msg });
    }
  }

  signIn = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
      const token = await this._facade.signin({ email, password});
      res.status(200).json({ token: token });
    } catch (err: any) {
      res.status(err.id).json({ message: err.msg });
    }
  }
}
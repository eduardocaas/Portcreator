import { Request, Response } from "express";
import { IAuthFacade } from "../facades/interfaces/IAuthFacade";
import { log } from "console";

export class AuthController {
  private readonly _facade: IAuthFacade;

  constructor(facade: IAuthFacade) {
    this._facade = facade;
  }

  signUp = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    try {
      const userPartial = await this._facade.signup({ name, email, password })
      res.status(201).json(userPartial);
    } catch (err: any) {
      if (err.id) {
        res.status(err.id).json({ message: err.msg });
      }
      else {
        res.status(500).json({ message: err });
      }
    }
  }

  signIn = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
      const token = await this._facade.signin({ email, password });
      res.status(200).json({ token: token });
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
import { IAuthService } from "../services/interfaces/IAuthService";
import { NextFunction, Request, Response } from "express";

export class TokenMiddleware {
  private _authService: IAuthService;

  constructor(authService: IAuthService) {
    this._authService = authService;
  }

  verifyAccess(req: Request, res: Response, next: NextFunction) {
    let token = req.get("Token");
    if (!token) {
      res.status(401).json({ message: "Acesso não autorizado - sem token" });
    }
    else {
      let result = this._authService.validateToken(token);
      if (result) {
        return next();
      }
      res.status(401).json({ message: "Acesso não autorizado - token inválido" });
    }
  }
}
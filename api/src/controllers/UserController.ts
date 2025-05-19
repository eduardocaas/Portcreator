import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    private _service: UserService;
  
    constructor(service: UserService) {
      this._service = service;
    }

    update = async (req: Request, res: Response): Promise<void> => {
      
    }
}
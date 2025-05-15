import { UserService } from "../services/UserService";

export class UserController {
    private _service: UserService;
  
    constructor(service: UserService) {
      this._service = service;
    }
}
import { AuthService } from "../services/AuthService";

export class AuthController {
  private _service: AuthService;

  constructor(service: AuthService) {
    this._service = service;
  }
}
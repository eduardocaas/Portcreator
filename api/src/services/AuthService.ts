import { Repository } from "typeorm";
import { User } from "../models/User";

export class AuthService {
  private _repository: Repository<User>;

  constructor(repository: Repository<User>) {
    this._repository = repository;
  }
}
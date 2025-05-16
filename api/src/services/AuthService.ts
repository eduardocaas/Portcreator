import { Repository } from "typeorm";
import { User } from "../models/User";
import { IAuthService } from "./interfaces/IAuthService";
import * as bcrypt from 'bcrypt';

export class AuthService implements IAuthService {
  private readonly _repository: Repository<User>;

  constructor(repository: Repository<User>) {
    this._repository = repository;
  }
  
  generateHash(input: string): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
import { Repository } from "typeorm";
import { User } from "../models/User";
import { IAuthService } from "./interfaces/IAuthService";
import * as bcrypt from 'bcrypt';

export class AuthService implements IAuthService {
  private readonly _repository: Repository<User>;

  constructor(repository: Repository<User>) {
    this._repository = repository;
  }

  async generateHash(password: string): Promise<string> {
    let saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
  }

  async compareHash(password: string, hashPassword: string): Promise<boolean> {
    let result = await bcrypt.compare(password, hashPassword);
    return result;
  }
}
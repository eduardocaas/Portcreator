import "dotenv/config";
import { Repository } from "typeorm";
import { User } from "../models/User";
import { IAuthService } from "./interfaces/IAuthService";
import * as bcrypt from 'bcrypt';
import { sign, verify, decode } from 'jsonwebtoken';

const SECRET = process.env.APP_SECRET!;

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

  generateToken(id: string, email: string, firstAccess: boolean): string {
    let token = sign({
      userId: id,
      userEmail: email,
      firstAccess: firstAccess
    }, SECRET,
      {
        expiresIn: '1h',
        algorithm: 'HS256'
      }
    );
    return token;
  }

  validateToken(token: string): boolean {
    try {
      const payload = verify(token, SECRET);

      if (!payload) {
        return false;
      }
      return true;
    }
    catch (err) {
      return false;
    }
  }

  getIdByToken(token: string): string | undefined {
    const decoded = decode(token) as any;
    return decoded?.userId;
  }
}
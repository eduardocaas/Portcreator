import { Repository } from "typeorm";
import { User } from "../models/User";
import { IUserService } from "./interfaces/IUserService";

export class UserService implements IUserService {
  private _repository: Repository<User>;

  constructor(
    repository: Repository<User>
  ) {
    this._repository = repository;
  }

  async save(user: User): Promise<User> {
    try {
      let userSave = await this._repository.save(user);
      return userSave;
    }
    catch (err) {
      throw ({ id: 500, msg: err })
    }
  }

  async getByEmail(email: string): Promise<User> {
    let user = await this._repository.findOneBy({ email: email });
    if (user) {
      return user;
    }
    throw ({ id: 404, msg: `Usuário com o email ${email} não encontrado` })
  }

  async existsByEmail(email: string): Promise<boolean> {
    let exists = await this._repository.existsBy({ email: email })
    return exists;
  }

}
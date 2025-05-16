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
}
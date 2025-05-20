import { Repository } from "typeorm";
import { User } from "../models/User";
import { IUserService } from "./interfaces/IUserService";
import { UserUpdateInputModel } from "../models/input/user/UserUpdateInputModel";
import * as validator from 'validator';
import { UserViewModel } from "../models/view/user/UserViewModel";

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

  async getById(id: string): Promise<UserViewModel> {
    if (!validator.isUUID(id!)) {
      throw ({ id: 400, msg: "Id inválido" });
    }

    let user = await this._repository.findOneBy({ id: id })
    if (!user || user == null) {
      throw ({ id: 404, msg: "Usuário não encontrado" });
    }
    let viewModel = new UserViewModel(
      user.id,
      user.name,
      user.email,
      user.location,
      user.description,
      user.goal,
      user.github,
      user.linkedin,
      user.imagePath);

    return viewModel;
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

  async update(id: string, input: UserUpdateInputModel): Promise<boolean> {
    if (!validator.isUUID(id)) {
      throw ({ id: 400, msg: "Id inválido" });
    }

    if (!input?.name || !input?.email) {
      throw ({ id: 400, msg: "Campos obrigatórios: nome e email" });
    }

    let user = await this._repository.findOneBy({ id: id });
    if (!user || user == null) {
      throw ({ id: 404, msg: "Usuário não encontrado" });
    }
    else {
      user.update(
        input.name,
        input.email,
        input.location,
        input.description,
        input.goal,
        input.github,
        input.linkedin);
      let userUpdated = await this._repository.save(user);
      if (!userUpdated?.id) {
        return false;
      }
      return true;
    }
  }
}
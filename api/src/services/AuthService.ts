import { Repository } from "typeorm";
import { User } from "../models/User";
import { IAuthService } from "./interfaces/IAuthService";
import { SignupInputModel } from "../models/input/user/SignupInputModel";
import { UserPartialViewModel } from "../models/view/user/UserPartialViewModel";

export class AuthService implements IAuthService {
  private readonly _repository: Repository<User>;

  constructor(repository: Repository<User>) {
    this._repository = repository;
  }

  async signup(input: SignupInputModel): Promise<UserPartialViewModel> {
    if (!input?.name || input?.email || !input?.password) {
      throw new Error("Campos obrigatórios: nome, email e senha");  
    }
    // TODO: bCrypt Password!
    let user = new User(input.name, input.email, input.password);
    let userSave = await this._repository.save(user);
    return new UserPartialViewModel(userSave.id, userSave.email);

  }
}
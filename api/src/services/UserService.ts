import { Repository } from "typeorm";
import { User } from "../models/User";
import { SignupInputModel } from "../models/input/user/SignupInputModel";
import { UserPartialViewModel } from "../models/view/user/UserPartialViewModel";
import { IUserService } from "./interfaces/IUserService";
import { IAuthService } from "./interfaces/IAuthService";

export class UserService implements IUserService {
  private _repository: Repository<User>;
  private _authService: IAuthService;

  constructor(
    repository: Repository<User>,
    authService: IAuthService) {
    this._repository = repository;
    this._authService = authService;
  }

  async save(input: SignupInputModel): Promise<UserPartialViewModel> {
    if (!input?.name || input?.email || !input?.password) {
      throw new Error("Campos obrigatórios: nome, email e senha");
    }

    let hashPassword = await this._authService.generateHash(input.password);

    let user = new User(input.name, input.email, hashPassword);
    let userSave = await this._repository.save(user);

    return new UserPartialViewModel(userSave.id, userSave.email);
  }
}
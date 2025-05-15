import { Repository } from "typeorm";
import { User } from "../models/User";
import { IAuthService } from "./interfaces/IAuthService";
import { SignupInputModel } from "../models/input/user/SignupInputModel";
import { UserPartialViewModel } from "../models/view/user/UserPartialViewModel";

export class AuthService implements IAuthService{
  private _repository: Repository<User>;

  constructor(repository: Repository<User>) {
    this._repository = repository;
  }
  signup(input: SignupInputModel): Promise<UserPartialViewModel> {
    throw new Error("Method not implemented.");
  }
}
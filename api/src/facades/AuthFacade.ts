import { SignupInputModel } from "../models/input/user/SignupInputModel";
import { User } from "../models/User";
import { UserPartialViewModel } from "../models/view/user/UserPartialViewModel";
import { IAuthService } from "../services/interfaces/IAuthService";
import { IUserService } from "../services/interfaces/IUserService";
import { IAuthFacade } from "./interfaces/IAuthFacade";

export class AuthFacade implements IAuthFacade {
  private readonly _authService: IAuthService;
  private readonly _userService: IUserService;

  constructor(authService: IAuthService, userService: IUserService) {
    this._authService = authService;
    this._userService = userService;
  }

  async signup(input: SignupInputModel): Promise<UserPartialViewModel> {
    if (!input?.name || input?.email || !input?.password) {
      throw ({ id: 400, msg: "Campos obrigatórios: nome, email e senha" });
    }

    let hashPassword = await this._authService.generateHash(input.password);
    
    let user = new User(input.name, input.email, hashPassword);
    let userCreated = await this._userService.save(user);

    return new UserPartialViewModel(userCreated.id, userCreated.email);
  }
}
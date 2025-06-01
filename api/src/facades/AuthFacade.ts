import { SigninInputModel } from "../models/input/user/SigninInputModel";
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
    if (!input?.name || !input?.email || !input?.password) {
      throw ({ id: 400, msg: "Campos obrigatórios: nome, email e senha" });
    }

    let userExists = await this._userService.existsByEmail(input.email);
    if (userExists) {
      throw ({ id: 409, msg: "Email já cadastrado" });
    }

    let hashPassword = await this._authService.generateHash(input.password);

    let user = new User(input.name, input.email, hashPassword);
    let userCreated = await this._userService.save(user);

    return new UserPartialViewModel(userCreated.id, userCreated.email);
  }

  async signin(input: SigninInputModel): Promise<string> {
    if (!input?.email || !input?.password) {
      throw ({ id: 400, msg: "Campos obrigatórios: email e senha" })
    }

    let user = await this._userService.getByEmail(input.email);

    let result = await this._authService.compareHash(input.password, user.password);
    if (result) {
      let token = this._authService.generateToken(user.id, user.email, user.firstUpdate);
      return token;
    }
    throw({ id: 404, msg: "Email ou senha incorretos!"});
  }
}
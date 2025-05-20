import { UserViewModel } from "../models/view/user/UserViewModel";
import { IAuthService } from "../services/interfaces/IAuthService";
import { IUserService } from "../services/interfaces/IUserService";
import { IUserFacade } from "./interfaces/IUserFacade";

export class UserFacade implements IUserFacade {
  private readonly _authService: IAuthService;
  private readonly _userService: IUserService;

  constructor(
    authService: IAuthService,
    userService: IUserService
  ) {
    this._authService = authService;
    this._userService = userService;
  }

  async getUserByToken(token: string | undefined): Promise<UserViewModel> {
    if (!token || token == undefined) {
      throw ({ id: 400, msg: "Token inválido" });
    }
    const id = this._authService.getIdByToken(token);

    if (!id || id == undefined) {
      throw ({ id: 400, msg: "Id inválido" });
    }
    const userViewModel = await this._userService.getById(id);
    return userViewModel;
  }
}
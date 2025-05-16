import { SignupInputModel } from "../../models/input/user/SignupInputModel";
import { UserPartialViewModel } from "../../models/view/user/UserPartialViewModel";

export interface IUserService {
  save(input: SignupInputModel): Promise<UserPartialViewModel>
}
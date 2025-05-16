import { SigninInputModel } from "../../models/input/user/SigninInputModel";
import { SignupInputModel } from "../../models/input/user/SignupInputModel";
import { UserPartialViewModel } from "../../models/view/user/UserPartialViewModel";

export interface IAuthFacade {
  signup(input: SignupInputModel): Promise<UserPartialViewModel>;
  signin(input: SigninInputModel): Promise<string>;
}
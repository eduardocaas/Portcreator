import { SignupInputModel } from "../../models/input/user/SignupInputModel";
import { UserPartialViewModel } from "../../models/view/user/UserPartialViewModel";

export interface IAuthService {
    signup(input: SignupInputModel): Promise<UserPartialViewModel>;
}
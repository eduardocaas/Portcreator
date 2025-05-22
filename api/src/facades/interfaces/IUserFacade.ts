import { UserViewModel } from "../../models/view/user/UserViewModel";

export interface IUserFacade {
  getUserByToken(token: string | undefined): Promise<UserViewModel>;
  delete(token: string | undefined): Promise<void>;
}
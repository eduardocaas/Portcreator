import { User } from "../../models/User";
import { UserPartialViewModel } from "../../models/view/user/UserPartialViewModel";

export interface IUserService {
  save(user: User): Promise<User>
  getByEmail(email: string): Promise<User>
}
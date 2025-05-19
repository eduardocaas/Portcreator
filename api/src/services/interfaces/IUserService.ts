import { UserUpdateInputModel } from "../../models/input/user/UserUpdateInputModel";
import { User } from "../../models/User";
import { UserPartialViewModel } from "../../models/view/user/UserPartialViewModel";

export interface IUserService {
  save(user: User): Promise<User>
  getByEmail(email: string): Promise<User>
  existsByEmail(email: string): Promise<boolean>
  update(id: string, input: UserUpdateInputModel): Promise<boolean>
}
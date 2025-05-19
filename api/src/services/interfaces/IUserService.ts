import { UserUpdateInputModel } from "../../models/input/user/UserUpdateInputModel";
import { User } from "../../models/User";
import { UserViewModel } from "../../models/view/user/UserViewModel";

export interface IUserService {
  save(user: User): Promise<User>
  getById(id: string): Promise<UserViewModel>
  getByEmail(email: string): Promise<User>
  existsByEmail(email: string): Promise<boolean>
  update(id: string, input: UserUpdateInputModel): Promise<boolean>
}
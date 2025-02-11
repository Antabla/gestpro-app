import { IUser } from "../../auth/data/user.interface";

export interface IProject {
  id?: string;
  name: string;
  description: string;
  owner: IUser['id'];
}

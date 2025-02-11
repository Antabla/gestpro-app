import { EUserRole } from './user-role.enum';

export interface IUser {
  id?: string;
  username: string;
  password: string;
  role: EUserRole;
}

export interface IUserWithToken {
  id: string;
  username: string;
  token: string;
}

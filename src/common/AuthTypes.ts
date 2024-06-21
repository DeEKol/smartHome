import { TUserResponse } from "./UserTypes";

export type TLoginResponse = {
  accessToken: string;
  user: TUserResponse;
};

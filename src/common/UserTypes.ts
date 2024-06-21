import { UserOrmEntity } from "../server/user/user.orm-entity";

export type TUserResponse = Omit<UserOrmEntity, "password">;
export type TUserRequest = Omit<UserOrmEntity, "id">;

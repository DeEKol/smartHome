import { UserOrmEntity } from "../server/user/user.orm-entity";

export type TUserResponse = InstanceType<typeof UserOrmEntity>;
export type TUserRequest = Omit<TUserResponse, "id">;

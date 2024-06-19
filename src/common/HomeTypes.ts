import { HomeOrmEntity } from "../server/home/home.orm-entity";

export type THomeResponse = InstanceType<typeof HomeOrmEntity>;
export type THomeRequest = Omit<THomeResponse, "id">;

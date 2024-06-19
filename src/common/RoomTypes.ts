import { RoomOrmEntity } from "../server/room/room.orm-entity";

export type TRoomResponse = InstanceType<typeof RoomOrmEntity>;
export type TRoomRequest = Omit<TRoomResponse, "id">;

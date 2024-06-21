import { writable } from "svelte/store";
import { THomeResponse } from "../../../../common/HomeTypes";
import { TDeviceResponse } from "../../../../common/DeviceTypes";
import { TUserResponse } from "../../../../common/UserTypes";
import { TRoomResponse } from "../../../../common/RoomTypes";

export const userStore = writable<TUserResponse>({
  id: undefined,
  username: "",
});
export const homesStore = writable<THomeResponse[]>([]);
export const devicesStore = writable<TDeviceResponse[]>([]);
export const authStore = writable<{ error?: string }>({ error: undefined });
export const homeStore = writable<{
  home: THomeResponse;
  rooms: TRoomResponse[];
}>({ home: undefined, rooms: [] });

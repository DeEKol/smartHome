import { writable } from "svelte/store";
import { THomeResponse } from "../../../../common/HomeTypes";
import { TDeviceResponse } from "../../../../common/DeviceTypes";

export const userStore = writable({});
export const homesStore = writable<THomeResponse[]>([]);
export const devicesStore = writable<TDeviceResponse[]>([]);

import { DeviceOrmEntity } from "../server/device/device.orm-entity";

export type TDeviceResponse = InstanceType<typeof DeviceOrmEntity>;
export type TDeviceRequest = Omit<TDeviceResponse, "id">;

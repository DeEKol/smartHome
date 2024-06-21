import { DeviceOrmEntity } from "../server/device/device.orm-entity";

export type TDeviceResponse = InstanceType<typeof DeviceOrmEntity>;
export type TDeviceRequest = Omit<TDeviceResponse, "id">;

export type TDeviceType =
  | "bulb"
  | "switcher"
  | "thermostat"
  | "fan"
  | "conditioner"
  | "socket"
  | "waterLink"
  | "doorLink"
  | "windowLink"
  | "radiatorControl";

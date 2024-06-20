import { TDeviceResponse } from "./DeviceTypes";
import { THomeResponse } from "./HomeTypes";

export type TSetDegreesResponse = {
  home: THomeResponse;
  devices: TDeviceResponse[];
};

type coolingRate = "disabled" | "low" | "medium" | "high";
type heatingRate = "disabled" | "low" | "medium" | "high";

const temperatureThresholds = {
  freezing: {
    minTemperature: -50,
    maxTemperature: 0,
    coolingRate: "disabled",
    heatingRate: "high",
  },
  cold: {
    minTemperature: 1,
    maxTemperature: 20,
    coolingRate: "disabled",
    heatingRate: "medium",
  },
  comfortable: {
    minTemperature: 21,
    maxTemperature: 25,
    coolingRate: "low",
    heatingRate: "disabled",
  },
  hot: {
    minTemperature: 26,
    maxTemperature: 40,
    coolingRate: "high",
    heatingRate: "disabled",
  },
};

export type TTypeStatuses = {
  bulb: boolean;
  switcher: boolean;
  thermostat: number;
  fan: coolingRate;
  conditioner: coolingRate;
  socket: boolean;
  waterLink: boolean;
  doorLink: boolean;
  windowLink: boolean;
  radiatorControl: heatingRate;
};

type TDeviceType =
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

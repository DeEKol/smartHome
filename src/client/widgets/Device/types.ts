import { TDeviceType } from "../../../common/DeviceTypes";

export const typesArr = [
  "bulb",
  "switcher",
  "thermostat",
  "fan",
  "conditioner",
  "socket",
  "waterLink",
  "doorLink",
  "windowLink",
  "radiatorControl",
] as const;
// Утилита для проверки соответствия
function checkTypeAliases<T extends readonly string[]>(array: T) {
  return array;
}
// Проверка, что массив включает все алиасы из типа
export const typeAliases: TDeviceType[] = checkTypeAliases(typesArr);

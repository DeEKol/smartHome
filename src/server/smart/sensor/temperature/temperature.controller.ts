import { Body, Controller, Get, Post, Put } from "@nestjs/common";
import { TemperatureOrmEntity } from "./temperature.orm-entity";
import { TemperatureService } from "./temperature.service";
import { DeviceService } from "../../../device/device.service";
import { DeviceOrmEntity } from "../../../device/device.orm-entity";
import { TDeviceResponse } from "../../../../common/DeviceTypes";
import { HomeService } from "../../../home/home.service";
import { HomeOrmEntity } from "../../../home/home.orm-entity";
import { RoomOrmEntity } from "../../../room/room.orm-entity";

type TSetDegreesResponse = {
  home: HomeOrmEntity;
  devices: DeviceOrmEntity[];
};

@Controller("api/smart")
export class TemperatureController {
  constructor(
    private readonly _temperatureService: TemperatureService,
    private readonly _deviceService: DeviceService,
    private readonly _homeService: HomeService,
  ) {}

  // ? Задает температуру в доме, возвращает, комнату с изменной температурой и список устройств с измененными состояниями
  // @Post("/temperature/set")
  // async setDegrees(
  //   @Body() { degrees, homeId }: { degrees: number; homeId: number },
  // ): Promise<TSetDegreesResponse> {
  //   const { id: homeFromDbId, ...homeFromDb }: HomeOrmEntity =
  //     await this._homeService.getOne(homeId);
  //   const returnHome = await this._homeService.update(homeFromDbId, {
  //     ...homeFromDb,
  //     temperature: degrees,
  //   });
  //
  //   const changedStatus = async (
  //     _device: DeviceOrmEntity,
  //     deviceType: "radiatorControl" | "fan" | "conditioner",
  //     rate: "heatingRate" | "coolingRate",
  //   ) => {
  //     if (_device.type === deviceType) {
  //       for (const temperature of temperatures) {
  //         if (
  //           temperature.minTemperature <= degrees &&
  //           degrees <= temperature.maxTemperature
  //         ) {
  //           _device.status = temperature[rate];
  //           const { id: deviceId, ...updDevice } = _device;
  //           await this._deviceService.update(deviceId, updDevice);
  //         }
  //       }
  //       returnDevicesArr.push(_device);
  //     }
  //   };
  //
  //   const devices: DeviceOrmEntity[] = await this._deviceService.getAll();
  //   const temperatures: TemperatureOrmEntity[] =
  //     await this._temperatureService.getAll();
  //
  //   const returnDevicesArr: TDeviceResponse[] = [];
  //
  //   if (devices) {
  //     for (const device of devices) {
  //       // TODO: проблема с типизацией (хранением id в бд и получением объекта в коде)
  //       const roomDevice: RoomOrmEntity =
  //         device.roomId as unknown as RoomOrmEntity;
  //       const homeDevice: HomeOrmEntity =
  //         roomDevice.homeId as unknown as HomeOrmEntity;
  //
  //       if (device.isSmart && homeDevice.id === homeFromDbId) {
  //         await changedStatus(device, "radiatorControl", "heatingRate");
  //         await changedStatus(device, "fan", "coolingRate");
  //         await changedStatus(device, "conditioner", "coolingRate");
  //
  //         if (device.type === "thermostat") {
  //           device.status = degrees.toString();
  //           const { id: deviceId, ...updDevice } = device;
  //           await this._deviceService.update(deviceId, updDevice);
  //
  //           returnDevicesArr.push(device);
  //         }
  //       }
  //     }
  //   }
  //
  //   return { home: returnHome, devices: returnDevicesArr };
  // }

  @Get("/temperatures")
  findAll(): Promise<TemperatureOrmEntity[]> {
    return this._temperatureService.getAll();
  }

  @Put("/temperature/update")
  update(
    @Body() { id, ...home }: TemperatureOrmEntity,
  ): Promise<TemperatureOrmEntity> {
    return this._temperatureService.update(id, home);
  }
}

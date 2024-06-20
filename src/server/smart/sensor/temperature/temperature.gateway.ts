import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { Socket, Server } from "socket.io";
import { HomeOrmEntity } from "../../../home/home.orm-entity";
import { DeviceOrmEntity } from "../../../device/device.orm-entity";
import { TemperatureOrmEntity } from "./temperature.orm-entity";
import { TDeviceResponse } from "../../../../common/DeviceTypes";
import { RoomOrmEntity } from "../../../room/room.orm-entity";
import { TSetDegreesResponse } from "../../../../common/TemperatureTypes";
import { TemperatureService } from "./temperature.service";
import { DeviceService } from "../../../device/device.service";
import { HomeService } from "../../../home/home.service";
import { pathsApi } from "../../../../common/PathsApi";

@WebSocketGateway()
export class TemperatureGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly _temperatureService: TemperatureService,
    private readonly _deviceService: DeviceService,
    private readonly _homeService: HomeService,
  ) {}
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger("TemperatureGateway");

  // ? Изменение температуры в доме, через сокеты
  // ? Задает температуру в доме, возвращает, комнату с изменной температурой и список устройств с измененными состояниями
  @SubscribeMessage(pathsApi.temperature.setDegrees.path)
  async handleMessage(
    client: Socket,
    payload: { degrees: number; homeId: number },
  ): Promise<void> {
    const { id: homeFromDbId, ...homeFromDb }: HomeOrmEntity =
      await this._homeService.getOne(payload.homeId);
    const returnHome = await this._homeService.update(homeFromDbId, {
      ...homeFromDb,
      temperature: payload.degrees,
    });

    const changedStatus = async (
      _device: DeviceOrmEntity,
      deviceType: "radiatorControl" | "fan" | "conditioner",
      rate: "heatingRate" | "coolingRate",
    ) => {
      if (_device.type === deviceType) {
        for (const temperature of temperatures) {
          if (
            temperature.minTemperature <= payload.degrees &&
            payload.degrees <= temperature.maxTemperature
          ) {
            _device.status = temperature[rate];
            const { id: deviceId, ...updDevice } = _device;
            await this._deviceService.update(deviceId, updDevice);
          }
        }
        returnDevicesArr.push(_device);
      }
    };

    const devices: DeviceOrmEntity[] = await this._deviceService.getAll();
    const temperatures: TemperatureOrmEntity[] =
      await this._temperatureService.getAll();

    const returnDevicesArr: TDeviceResponse[] = [];

    if (devices) {
      for (const device of devices) {
        // TODO: проблема с типизацией (хранением id в бд и получением объекта в коде)
        const roomDevice: RoomOrmEntity =
          device.roomId as unknown as RoomOrmEntity;
        const homeDevice: HomeOrmEntity =
          roomDevice.homeId as unknown as HomeOrmEntity;

        if (device.isSmart && homeDevice.id === homeFromDbId) {
          await changedStatus(device, "radiatorControl", "heatingRate");
          await changedStatus(device, "fan", "coolingRate");
          await changedStatus(device, "conditioner", "coolingRate");

          if (device.type === "thermostat") {
            device.status = payload.degrees.toString();
            const { id: deviceId, ...updDevice } = device;
            await this._deviceService.update(deviceId, updDevice);

            returnDevicesArr.push(device);
          }
        }
      }
    }

    const setDegreesResponse: TSetDegreesResponse = {
      home: returnHome,
      devices: returnDevicesArr,
    };

    this.server.emit(pathsApi.temperature.setDegrees.path, setDegreesResponse);
  }

  afterInit(server: Server) {
    this.logger.log("Init");
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}

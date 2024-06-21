import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { DeviceService } from "./device.service";
import { DeviceOrmEntity } from "./device.orm-entity";
import { TDeviceRequest, TDeviceResponse } from "../../common/DeviceTypes";
import { pathsApi } from "../../common/PathsApi";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller()
@UseGuards(JwtAuthGuard)
export class DeviceController {
  constructor(private readonly _deviceService: DeviceService) {}

  @Get(pathsApi.device.findAll.path)
  findAll(): Promise<TDeviceResponse[]> {
    return this._deviceService.getAll();
  }

  @Get(pathsApi.device.findOneForRoomId.path + ":id")
  findOneForRoomId(@Param("id") id: number): Promise<DeviceOrmEntity[]> {
    return this._deviceService.getAllForRoomId(id);
  }

  @Get(pathsApi.device.findOne.path + ":id")
  findOne(@Param("id") id: number): Promise<DeviceOrmEntity> {
    return this._deviceService.getOne(id);
  }

  @Post(pathsApi.device.create.path)
  create(@Body() device: TDeviceRequest): Promise<TDeviceResponse> {
    return this._deviceService.create(device);
  }

  @Put(pathsApi.device.update.path)
  update(@Body() { id, ...device }: TDeviceResponse): Promise<TDeviceResponse> {
    return this._deviceService.update(id, device);
  }

  @Delete(pathsApi.device.delete.path + ":id")
  delete(@Param("id") id: number): Promise<boolean> {
    return this._deviceService.delete(id);
  }
}

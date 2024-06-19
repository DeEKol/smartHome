import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { DeviceService } from "./device.service";
import { DeviceOrmEntity } from "./device.orm-entity";
import { TDeviceRequest, TDeviceResponse } from "../../common/DeviceTypes";

@Controller("/api/smart")
export class DeviceController {
  constructor(private readonly _deviceService: DeviceService) {}

  @Get("/devices")
  findAll(): Promise<TDeviceResponse[]> {
    return this._deviceService.getAll();
  }
  @Get("/device/:id")
  findOne(@Param("id") id: number): Promise<DeviceOrmEntity> {
    return this._deviceService.getOne(id);
  }

  @Post("/device/create")
  create(@Body() device: TDeviceRequest): Promise<TDeviceResponse> {
    return this._deviceService.create(device);
  }

  @Put("/device/update")
  update(@Body() { id, ...device }: TDeviceResponse): Promise<TDeviceResponse> {
    return this._deviceService.update(id, device);
  }

  @Delete("/device/delete/:id")
  delete(@Param("id") id: number): Promise<boolean> {
    return this._deviceService.delete(id);
  }
}

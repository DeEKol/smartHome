import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { TemperatureOrmEntity } from "./temperature.orm-entity";
import { TemperatureService } from "./temperature.service";
import { pathsApi } from "../../../../common/PathsApi";
import { JwtAuthGuard } from "../../../auth/jwt-auth.guard";

@Controller("api/smart")
@UseGuards(JwtAuthGuard)
export class TemperatureController {
  constructor(private readonly _temperatureService: TemperatureService) {}

  @Get(pathsApi.temperature.findAll.path)
  findAll(): Promise<TemperatureOrmEntity[]> {
    return this._temperatureService.getAll();
  }

  @Put(pathsApi.temperature.update.path)
  update(
    @Body() { id, ...home }: TemperatureOrmEntity,
  ): Promise<TemperatureOrmEntity> {
    return this._temperatureService.update(id, home);
  }
}

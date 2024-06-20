import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TemperatureOrmEntity } from "./temperature.orm-entity";
import { TemperatureService } from "./temperature.service";
import { TemperatureController } from "./temperature.controller";
import { DeviceService } from "../../../device/device.service";
import { DeviceOrmEntity } from "../../../device/device.orm-entity";
import { HomeOrmEntity } from "../../../home/home.orm-entity";
import { HomeService } from "../../../home/home.service";
import { TemperatureGateway } from "./temperature.gateway";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TemperatureOrmEntity,
      HomeOrmEntity,
      DeviceOrmEntity,
    ]),
  ],
  providers: [
    TemperatureService,
    HomeService,
    DeviceService,
    TemperatureGateway,
  ],
  controllers: [TemperatureController],
})
export class TemperatureModule {}

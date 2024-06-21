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
import { RoomOrmEntity } from "../../../room/room.orm-entity";
import { RoomService } from "../../../room/room.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TemperatureOrmEntity,
      HomeOrmEntity,
      DeviceOrmEntity,
      RoomOrmEntity,
    ]),
  ],
  providers: [
    TemperatureService,
    HomeService,
    DeviceService,
    RoomService,
    TemperatureGateway,
  ],
  controllers: [TemperatureController],
})
export class TemperatureModule {}

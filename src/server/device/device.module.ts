import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeviceOrmEntity } from "./device.orm-entity";
import { DeviceService } from "./device.service";
import { DeviceController } from "./device.controller";
import { RoomOrmEntity } from "../room/room.orm-entity";
import { RoomService } from "../room/room.service";
import { HomeOrmEntity } from "../home/home.orm-entity";
import { HomeService } from "../home/home.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([DeviceOrmEntity, RoomOrmEntity, HomeOrmEntity]),
  ],
  providers: [DeviceService, RoomService, HomeService],
  controllers: [DeviceController],
})
export class DeviceModule {}

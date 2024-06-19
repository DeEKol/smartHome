import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeviceOrmEntity } from "./device.orm-entity";
import { DeviceService } from "./device.service";
import { DeviceController } from "./device.controller";

@Module({
  imports: [TypeOrmModule.forFeature([DeviceOrmEntity])],
  providers: [DeviceService],
  controllers: [DeviceController],
})
export class DeviceModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomOrmEntity } from "./room.orm-entity";
import { RoomService } from "./room.service";
import { RoomController } from "./room.controller";
import { HomeOrmEntity } from "../home/home.orm-entity";
import { HomeService } from "../home/home.service";

@Module({
  imports: [TypeOrmModule.forFeature([RoomOrmEntity, HomeOrmEntity])],
  providers: [RoomService, HomeService],
  controllers: [RoomController],
})
export class RoomModule {}

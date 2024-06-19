import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomOrmEntity } from "./room.orm-entity";
import { RoomService } from "./room.service";
import { RoomController } from "./room.controller";
import { HomeOrmEntity } from "../home/home.orm-entity";

@Module({
  imports: [TypeOrmModule.forFeature([RoomOrmEntity])],
  providers: [RoomService],
  controllers: [RoomController],
})
export class RoomModule {}

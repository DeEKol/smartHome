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
import { RoomService } from "./room.service";
import { TRoomRequest, TRoomResponse } from "../../common/RoomTypes";
import { pathsApi } from "../../common/PathsApi";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller()
@UseGuards(JwtAuthGuard)
export class RoomController {
  constructor(private readonly _roomService: RoomService) {}

  @Get(pathsApi.room.findAll.path)
  findAll(): Promise<TRoomResponse[]> {
    return this._roomService.getAll();
  }

  @Get(pathsApi.room.findAllForHome.path + ":homeName")
  findAllForHome(
    @Param("homeName") homeName: string,
  ): Promise<TRoomResponse[]> {
    console.log(homeName);
    return this._roomService.getAllForHome(homeName);
  }
  @Get(pathsApi.room.findOne.path + ":id")
  findOne(@Param("id") id: number): Promise<TRoomResponse> {
    return this._roomService.getOne(id);
  }

  @Post(pathsApi.room.create.path)
  create(@Body() room: TRoomRequest): Promise<TRoomResponse> {
    return this._roomService.create(room);
  }

  @Put(pathsApi.room.update.path)
  update(@Body() { id, ...room }: TRoomResponse): Promise<TRoomResponse> {
    return this._roomService.update(id, room);
  }

  @Delete(pathsApi.room.delete.path + ":id")
  delete(@Param("id") id: number): Promise<boolean> {
    return this._roomService.delete(id);
  }
}

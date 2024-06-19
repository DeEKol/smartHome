import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { RoomService } from "./room.service";
import { TRoomRequest, TRoomResponse } from "../../common/RoomTypes";

@Controller("/api/smart")
export class RoomController {
  constructor(private readonly _roomService: RoomService) {}

  @Get("/rooms")
  findAll(): Promise<TRoomResponse[]> {
    return this._roomService.getAll();
  }
  @Get("/room/:id")
  findOne(@Param("id") id: number): Promise<TRoomResponse> {
    return this._roomService.getOne(id);
  }

  @Post("/room/create")
  create(@Body() home: TRoomRequest): Promise<TRoomResponse> {
    return this._roomService.create(home);
  }

  @Put("/home/update")
  update(@Body() { id, ...room }: TRoomResponse): Promise<TRoomResponse> {
    return this._roomService.update(id, room);
  }

  @Delete("/room/delete/:id")
  delete(@Param("id") id: number): Promise<boolean> {
    return this._roomService.delete(id);
  }
}

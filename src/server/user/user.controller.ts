import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { TUserRequest, TUserResponse } from "../../common/UserTypes";
import { UserOrmEntity } from "./user.orm-entity";

@Controller("/api/smart")
export class UserController {
  constructor(private readonly _homeService: UserService) {}

  @Get("/users")
  findAll(): Promise<TUserResponse[]> {
    return this._homeService.getAll();
  }
  @Get("/user/:id")
  findOne(@Param("id") id: number): Promise<TUserResponse> {
    return this._homeService.getOne(id);
  }

  @Post("/user/create")
  create(@Body() home: TUserRequest): Promise<TUserResponse> {
    return this._homeService.create(home);
  }

  @Put("/user/update")
  update(@Body() { id, ...home }: UserOrmEntity): Promise<TUserResponse> {
    return this._homeService.update(id, home);
  }

  @Delete("/user/delete/:id")
  delete(@Param("id") id: number): Promise<boolean> {
    return this._homeService.delete(id);
  }
}

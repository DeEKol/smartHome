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
import { UserService } from "./user.service";
import { TUserRequest, TUserResponse } from "../../common/UserTypes";
import { UserOrmEntity } from "./user.orm-entity";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("/api/smart")
export class UserController {
  constructor(private readonly _homeService: UserService) {}

  @Get("/users")
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<TUserResponse[]> {
    return this._homeService.getAll();
  }
  @Get("/user/:id")
  @UseGuards(JwtAuthGuard)
  findOne(@Param("id") id: number): Promise<TUserResponse> {
    return this._homeService.getOne(id);
  }

  @Post("/user/create")
  create(@Body() home: TUserRequest): Promise<TUserResponse> {
    return this._homeService.create(home);
  }

  @Put("/user/update")
  @UseGuards(JwtAuthGuard)
  update(@Body() { id, ...home }: UserOrmEntity): Promise<TUserResponse> {
    return this._homeService.update(id, home);
  }

  @Delete("/user/delete/:id")
  @UseGuards(JwtAuthGuard)
  delete(@Param("id") id: number): Promise<boolean> {
    return this._homeService.delete(id);
  }
}

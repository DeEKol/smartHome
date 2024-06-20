import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { HomeService } from "./home.service";
import { THomeRequest, THomeResponse } from "../../common/HomeTypes";
import { pathsApi } from "../../common/PathsApi";

@Controller()
export class HomeController {
  constructor(private readonly _homeService: HomeService) {}

  @Get(pathsApi.home.findAll.path)
  findAll(): Promise<THomeResponse[]> {
    return this._homeService.getAll();
  }
  @Get(pathsApi.home.findOne.path + ":id")
  findOne(@Param("id") id: number): Promise<THomeResponse> {
    return this._homeService.getOne(id);
  }

  @Post(pathsApi.home.create.path)
  create(@Body() home: THomeRequest): Promise<THomeResponse> {
    return this._homeService.create(home);
  }

  @Put(pathsApi.home.update.path)
  update(@Body() { id, ...home }: THomeResponse): Promise<THomeResponse> {
    return this._homeService.update(id, home);
  }

  @Delete(pathsApi.home.delete.path + ":id")
  delete(@Param("id") id: number): Promise<boolean> {
    return this._homeService.delete(id);
  }
}

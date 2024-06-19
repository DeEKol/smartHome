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

@Controller("/api/smart")
export class HomeController {
  constructor(private readonly _homeService: HomeService) {}

  @Get("/homes")
  findAll(): Promise<THomeResponse[]> {
    return this._homeService.getAll();
  }
  @Get("/home/:id")
  findOne(@Param("id") id: number): Promise<THomeResponse> {
    return this._homeService.getOne(id);
  }

  @Post("/home/create")
  create(@Body() home: THomeRequest): Promise<THomeResponse> {
    return this._homeService.create(home);
  }

  @Put("/home/update")
  update(@Body() { id, ...home }: THomeResponse): Promise<THomeResponse> {
    return this._homeService.update(id, home);
  }

  @Delete("/home/delete/:id")
  delete(@Param("id") id: number): Promise<boolean> {
    return this._homeService.delete(id);
  }
}

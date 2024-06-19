import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { HomeService } from "./home.service";
import { HomeOrmEntity } from "./home.orm-entity";

@Controller("/api/smart")
export class HomeController {
  constructor(private readonly _homeService: HomeService) {}

  @Get("/homes")
  findAll(): Promise<HomeOrmEntity[]> {
    return this._homeService.getAll();
  }
  @Get("/home/:id")
  findOne(@Param("id") id: number): Promise<HomeOrmEntity> {
    return this._homeService.getOne(id);
  }

  @Post("/home/create")
  create(@Body() home: HomeOrmEntity): Promise<HomeOrmEntity> {
    return this._homeService.create(home);
  }
}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HomeOrmEntity } from "./home.orm-entity";
import { HomeService } from "./home.service";
import { HomeController } from "./home.controller";

@Module({
  imports: [TypeOrmModule.forFeature([HomeOrmEntity])],
  providers: [HomeService],
  controllers: [HomeController],
})
export class HomeModule {}

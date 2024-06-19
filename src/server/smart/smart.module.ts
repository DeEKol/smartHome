import { Module } from "@nestjs/common";
import { HomeController } from "./home.controller";
import { HomeService } from "./home.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HomeOrmEntity } from "./home.orm-entity";

@Module({
  imports: [TypeOrmModule.forFeature([HomeOrmEntity])],
  providers: [HomeService],
  controllers: [HomeController],
})
export class SmartModule {}

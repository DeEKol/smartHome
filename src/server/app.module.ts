import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SmartModule } from "./smart/smart.module";
import { HomeOrmEntity } from "./smart/home.orm-entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_DATABASE"),
        logging: false,
        entities: [HomeOrmEntity],
        synchronize: true,
      }),
    }),
    SmartModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

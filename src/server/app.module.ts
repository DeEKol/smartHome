import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HomeOrmEntity } from "./home/home.orm-entity";
import { RoomOrmEntity } from "./room/room.orm-entity";
import { DeviceOrmEntity } from "./device/device.orm-entity";
import { HomeModule } from "./home/home.module";
import { RoomModule } from "./room/room.module";
import { DeviceModule } from "./device/device.module";
import { UserModule } from "./user/user.module";
import { UserOrmEntity } from "./user/user.orm-entity";
import { TemperatureOrmEntity } from "./smart/sensor/temperature/temperature.orm-entity";
import { TemperatureModule } from "./smart/sensor/temperature/temperature.module";

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
        entities: [
          HomeOrmEntity,
          RoomOrmEntity,
          DeviceOrmEntity,
          UserOrmEntity,
          TemperatureOrmEntity,
        ],
        synchronize: true,
      }),
    }),
    UserModule,
    HomeModule,
    RoomModule,
    DeviceModule,
    TemperatureModule,
  ],
  controllers: [],
})
export class AppModule {}

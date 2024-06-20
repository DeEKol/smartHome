import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TemperatureOrmEntity } from "./temperature.orm-entity";

@Injectable()
export class TemperatureService implements OnModuleInit {
  constructor(
    @InjectRepository(TemperatureOrmEntity)
    private readonly _temperatureRepository: Repository<TemperatureOrmEntity>,
  ) {}

  async getAll(): Promise<TemperatureOrmEntity[]> {
    return this._temperatureRepository.find();
  }

  private async create(
    temperature: TemperatureOrmEntity,
  ): Promise<TemperatureOrmEntity> {
    return this._temperatureRepository.save(temperature);
  }

  async update(
    temperatureId: number,
    temperatureUpdated: Omit<TemperatureOrmEntity, "id">,
  ): Promise<TemperatureOrmEntity> {
    const temperatureFromDb: TemperatureOrmEntity =
      await this._temperatureRepository.findOne({
        where: { id: temperatureId },
      });

    const newUser: TemperatureOrmEntity = {
      ...temperatureFromDb,
      ...temperatureUpdated,
    };

    return this._temperatureRepository.save(newUser);
  }

  // ? Seed base temperatures
  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    const temperatures: Omit<TemperatureOrmEntity, "id">[] = [
      {
        status: "freezing",
        minTemperature: -50,
        maxTemperature: 0,
        coolingRate: "disabled",
        heatingRate: "high",
      },
      {
        status: "cold",
        minTemperature: 1,
        maxTemperature: 20,
        coolingRate: "disabled",
        heatingRate: "medium",
      },
      {
        status: "comfortable",
        minTemperature: 21,
        maxTemperature: 25,
        coolingRate: "low",
        heatingRate: "disabled",
      },
      {
        status: "hot",
        minTemperature: 26,
        maxTemperature: 40,
        coolingRate: "high",
        heatingRate: "disabled",
      },
    ];

    for (const temperature of temperatures) {
      const existingTemperature = await this._temperatureRepository.findOne({
        where: { status: temperature.status },
      });
      if (!existingTemperature) {
        await this._temperatureRepository.save(temperature);
      }
    }
  }
}

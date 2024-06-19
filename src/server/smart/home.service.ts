import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HomeOrmEntity } from "./home.orm-entity";
import { Repository } from "typeorm";

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(HomeOrmEntity)
    private readonly _homeRepository: Repository<HomeOrmEntity>,
  ) {}

  async getAll(): Promise<HomeOrmEntity[]> {
    return this._homeRepository.find();
  }

  async getOne(homeId: number): Promise<HomeOrmEntity> {
    return this._homeRepository.findOne({
      where: {
        id: homeId,
      },
    });
  }

  async create(home: Omit<HomeOrmEntity, "id">): Promise<HomeOrmEntity> {
    return this._homeRepository.save(home);
  }
}

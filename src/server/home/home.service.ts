import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HomeOrmEntity } from "./home.orm-entity";
import { DeleteResult, Repository } from "typeorm";
import { THomeRequest, THomeResponse } from "../../common/HomeTypes";

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(HomeOrmEntity)
    private readonly _homeRepository: Repository<HomeOrmEntity>,
  ) {}

  async getAll(): Promise<THomeResponse[]> {
    return this._homeRepository.find();
  }

  async getOne(homeId: number): Promise<THomeResponse> {
    return this._homeRepository.findOne({
      where: {
        id: homeId,
      },
    });
  }

  async getOneForName(name: string): Promise<THomeResponse> {
    return this._homeRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  async create(home: THomeRequest): Promise<THomeResponse> {
    return this._homeRepository.save(home);
  }

  async update(
    homeId: number,
    homeUpdated: THomeRequest,
  ): Promise<THomeResponse> {
    const homeFromDb: THomeResponse = await this._homeRepository.findOne({
      where: { id: homeId },
    });

    const newUser: THomeResponse = { ...homeFromDb, ...homeUpdated };

    return this._homeRepository.save(newUser);
  }

  async delete(homeId: number): Promise<boolean> {
    const deleteResult: DeleteResult =
      await this._homeRepository.delete(homeId);

    return deleteResult.affected === 1;
  }
}

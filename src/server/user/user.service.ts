import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserOrmEntity } from "./user.orm-entity";
import { DeleteResult, Repository } from "typeorm";
import { TUserRequest, TUserResponse } from "../../common/UserTypes";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly _userRepository: Repository<UserOrmEntity>,
  ) {}

  async getAll(): Promise<TUserResponse[]> {
    return this._userRepository.find();
  }

  async getOne(homeId: number): Promise<TUserResponse> {
    return this._userRepository.findOne({
      where: {
        id: homeId,
      },
    });
  }

  async create(home: TUserRequest): Promise<TUserResponse> {
    return this._userRepository.save(home);
  }

  async update(
    homeId: number,
    homeUpdated: TUserRequest,
  ): Promise<TUserResponse> {
    const homeFromDb: TUserResponse = await this._userRepository.findOne({
      where: { id: homeId },
    });

    const newUser: TUserResponse = { ...homeFromDb, ...homeUpdated };

    return this._userRepository.save(newUser);
  }

  async delete(homeId: number): Promise<boolean> {
    const deleteResult: DeleteResult =
      await this._userRepository.delete(homeId);

    return deleteResult.affected === 1;
  }
}

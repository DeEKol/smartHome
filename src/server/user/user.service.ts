import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserOrmEntity } from "./user.orm-entity";
import { DeleteResult, Repository } from "typeorm";
import { TUserRequest, TUserResponse } from "../../common/UserTypes";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly _userRepository: Repository<UserOrmEntity>,
  ) {}

  async getAll(): Promise<UserOrmEntity[]> {
    return this._userRepository.find();
  }

  async getOne(userId: number): Promise<UserOrmEntity> {
    return this._userRepository.findOne({
      where: {
        id: userId,
      },
    });
  }

  async getOneForName(username: string): Promise<UserOrmEntity> {
    return this._userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async create(home: TUserRequest): Promise<UserOrmEntity> {
    const hashedPassword = await bcrypt.hash(home.password, 3);

    return this._userRepository.save({
      username: home.username,
      password: hashedPassword,
    });
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

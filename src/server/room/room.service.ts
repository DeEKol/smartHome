import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { RoomOrmEntity } from "./room.orm-entity";
import { TRoomRequest, TRoomResponse } from "../../common/RoomTypes";

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomOrmEntity)
    private readonly _roomRepository: Repository<RoomOrmEntity>,
  ) {}

  async getAll(): Promise<TRoomResponse[]> {
    return this._roomRepository.find({ relations: ["homeId"] });
  }

  async getOne(roomId: number): Promise<TRoomResponse> {
    return this._roomRepository.findOne({
      where: {
        id: roomId,
      },
      relations: ["homeId"],
    });
  }

  async create(room: TRoomRequest): Promise<TRoomResponse> {
    return this._roomRepository.save(room);
  }

  async update(
    roomId: number,
    roomUpdated: TRoomRequest,
  ): Promise<TRoomResponse> {
    const roomFromDb = await this._roomRepository.findOne({
      where: { id: roomId },
    });

    const newUser = { ...roomFromDb, ...roomUpdated };

    return this._roomRepository.save(newUser);
  }

  async delete(roomId: number): Promise<boolean> {
    const deleteResult: DeleteResult =
      await this._roomRepository.delete(roomId);

    return deleteResult.affected === 1;
  }
}

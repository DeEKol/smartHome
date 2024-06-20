import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { DeviceOrmEntity } from "./device.orm-entity";
import { TDeviceRequest, TDeviceResponse } from "../../common/DeviceTypes";

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(DeviceOrmEntity)
    private readonly _deviceRepository: Repository<DeviceOrmEntity>,
  ) {}

  async getAll(): Promise<TDeviceResponse[]> {
    return this._deviceRepository.find({
      relations: ["roomId", "roomId.homeId"],
    });
  }

  async getOne(deviceId: number): Promise<TDeviceResponse> {
    return this._deviceRepository.findOne({
      where: {
        id: deviceId,
      },
      relations: ["roomId", "roomId.homeId"],
    });
  }

  async create(device: TDeviceRequest): Promise<TDeviceResponse> {
    return this._deviceRepository.save(device);
  }

  async update(
    deviceId: number,
    deviceUpdated: TDeviceRequest,
  ): Promise<TDeviceResponse> {
    const deviceFromDb: TDeviceResponse = await this._deviceRepository.findOne({
      where: { id: deviceId },
      relations: ["roomId", "roomId.homeId"],
    });

    const newDevice: TDeviceResponse = {
      ...deviceFromDb,
      ...deviceUpdated,
    };

    return this._deviceRepository.save(newDevice);
  }

  async delete(deviceId: number): Promise<boolean> {
    const deleteResult: DeleteResult =
      await this._deviceRepository.delete(deviceId);

    return deleteResult.affected === 1;
  }
}

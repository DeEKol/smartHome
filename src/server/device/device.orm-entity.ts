import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoomOrmEntity } from "../room/room.orm-entity";
import { TDeviceType } from "../../common/DeviceTypes";

@Entity("Device")
export class DeviceOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  x: number;

  @Column()
  y: number;

  @Column()
  type: TDeviceType;

  @Column()
  isSmart: boolean;

  @Column()
  status: string;

  @ManyToOne(() => RoomOrmEntity, (room) => room.id)
  @JoinColumn({ name: "roomId" })
  roomId: number;
}

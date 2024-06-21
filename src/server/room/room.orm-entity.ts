import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HomeOrmEntity } from "../home/home.orm-entity";
import { DeviceOrmEntity } from "../device/device.orm-entity";

@Entity("Room", {})
export class RoomOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => HomeOrmEntity, (home) => home.id)
  @JoinColumn({ name: "homeId" })
  homeId: number;

  @OneToMany(() => DeviceOrmEntity, (device) => device.roomId)
  rooms?: DeviceOrmEntity[];
}

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RoomOrmEntity } from "../room/room.orm-entity";

@Entity("Device", {})
export class DeviceOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  status: string;

  @Column()
  x: number;

  @Column()
  y: number;

  @ManyToOne(() => RoomOrmEntity, (room) => room.id)
  @JoinColumn({ name: "roomId" })
  roomId: number;
}

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HomeOrmEntity } from "../home/home.orm-entity";

@Entity("Room", {})
export class RoomOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => HomeOrmEntity, (home) => home.id)
  @JoinColumn({ name: "homeId" })
  homeId: number;
}

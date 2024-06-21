import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoomOrmEntity } from "../room/room.orm-entity";

@Entity("Home", {})
export class HomeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  temperature: number;

  @OneToMany(() => RoomOrmEntity, (room) => room.homeId)
  rooms: RoomOrmEntity[];
}

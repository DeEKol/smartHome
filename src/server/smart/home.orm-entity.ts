import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Home", {})
export class HomeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

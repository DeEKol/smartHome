import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Home", {})
export class HomeOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}

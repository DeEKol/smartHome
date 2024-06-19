import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("User", {})
export class UserOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}

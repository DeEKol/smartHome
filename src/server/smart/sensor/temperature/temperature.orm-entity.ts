// ? Управление смарт состоянием температуры, которое активирует определенные устройства при определенной температуре

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

type TStatus = "freezing" | "cold" | "comfortable" | "hot";
type TCoolingRate = "disabled" | "low" | "medium" | "high";
type THeatingRate = "disabled" | "low" | "medium" | "high";

interface ITemperatureOrmEntity {
  id: number;
  status: TStatus;
  minTemperature: number;
  maxTemperature: number;
  coolingRate: TCoolingRate;
  heatingRate: THeatingRate;
}

@Entity("Temperature")
export class TemperatureOrmEntity implements ITemperatureOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  status: TStatus;

  @Column()
  minTemperature: number;

  @Column()
  maxTemperature: number;

  @Column()
  coolingRate: TCoolingRate;

  @Column()
  heatingRate: THeatingRate;
}

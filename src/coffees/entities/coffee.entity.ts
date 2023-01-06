import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Flavor } from "./flavor.entity"

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string // renamed name to tile to simulate migration use case

  @Column()
  brand: string

  @Column({ default: 0 })
  recommendations: number

  @JoinTable()
  @ManyToMany(type => Flavor, flavor => flavor.coffees, {
    cascade: true /* ['insert'] */,
  })
  flavors: Flavor[]
}

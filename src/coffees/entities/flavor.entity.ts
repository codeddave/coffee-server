import { PrimaryGeneratedColumn } from "typeorm"

export class Flavor {
  @PrimaryGeneratedColumn
  id: number
}

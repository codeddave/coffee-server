import { CoffeeRefactor1672357736199 } from "./src/migrations/1672357736199-CoffeeRefactor"
import { Coffee } from "src/coffees/entities/coffee.entity"
import { Flavor } from "src/coffees/entities/flavor.entity"
import { CofeeRefactor1672355838345 } from "src/migrations/1672355838345-CofeeRefactor"
import { DataSource } from "typeorm"

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "pass123",
  database: "postgres",
  entities: [],
  migrations: [CoffeeRefactor1672357736199],
})

import { TypeOrmModule } from "@nestjs/typeorm"
import { Module } from "@nestjs/common"
import { CoffeesController } from "./coffees.controller"
import { CoffeesService } from "./coffees.service"
import { Coffee } from "./entities/coffee.entity"
import { Flavor } from "./entities/flavor.entity"
import { Event } from "src/events/entities/event.entity"

/* class MockCoffeeService {} */
@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    { provide: "COFFEE_BRANDS", useValue: ["buddy brew", "nescafe"] },
  ],

  /*CUSTOM   providers: [{ provide: CoffeesService, useValue: new MockCoffeeService() }], */
  exports: [CoffeesService],
})
export class CoffeesModule {}

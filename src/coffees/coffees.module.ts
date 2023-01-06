import { TypeOrmModule } from "@nestjs/typeorm"
import { Module } from "@nestjs/common"
import { CoffeesController } from "./coffees.controller"
import { CoffeesService } from "./coffees.service"
import { Coffee } from "./entities/coffee.entity"
import { Flavor } from "./entities/flavor.entity"
import { Event } from "src/events/entities/event.entity"
//import { COFFEE_BRANDS } from "./coffees.constants"

/* class MockCoffeeService {} */
/* class DevelopmentConfigService {}
class ProductionConfigService {} */

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  /* providers: [
    CoffeesService,
    {
      provide: CoffeesService,
      useClass:
        process.env.NODE_ENV === "development"
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
  ],
 */
  /*NON-CLASS-BASED   providers: [
    CoffeesService,
    { provide: COFFEE_BRANDS, useValue: ["buddy brew", "nescafe"] },
  ], */

  /*CUSTOM   providers: [{ provide: CoffeesService, useValue: new MockCoffeeService() }], */
  exports: [CoffeesService],
})
export class CoffeesModule {}

import { TypeOrmModule } from "@nestjs/typeorm"
import { Injectable, Module, Scope } from "@nestjs/common"
import { CoffeesController } from "./coffees.controller"
import { CoffeesService } from "./coffees.service"
import { Coffee } from "./entities/coffee.entity"
import { Flavor } from "./entities/flavor.entity"
import { Event } from "src/events/entities/event.entity"
import { COFFEE_BRANDS } from "./coffees.constants"

/* class MockCoffeeService {} */
/* class DevelopmentConfigService {}
class ProductionConfigService {} */
@Injectable()
export class CoffeBrandsFactory {
  create() {
    return ["buddy brew", "nescafe"]
  }
}
@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],

  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useValue: ["buddy brew", "nescafe"],
      scope: Scope.TRANSIENT,
    },
  ],
  /*  providers: [
    CoffeesService,
    CoffeBrandsFactory,
    {
      provide: COFFEE_BRANDS,
      useFactory: async (connection): Promise<string[]> => {
        //const coffeeBrands = await connection.query('SELECT * ...');
        const coffeebrands = await Promise.resolve(["buddy brew", "nescafe"])
        return coffeebrands
      },
      inject: [CoffeBrandsFactory],
    },
  ], */

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

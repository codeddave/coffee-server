import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { DataSource } from "typeorm"
import { CoffeesService } from "./coffees.service"
import { Coffee } from "./entities/coffee.entity"
import { Flavor } from "./entities/flavor.entity"

describe("CoffeesService", () => {
  let service: CoffeesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,

        { provide: getRepositoryToken(Flavor), useValue: {} },
        { provide: getRepositoryToken(Coffee), useValue: {} },
        { provide: DataSource, useValue: {} },
      ],
    }).compile()

    service = module.get<CoffeesService>(CoffeesService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})

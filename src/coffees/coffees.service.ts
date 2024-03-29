import { UpdateCoffeeDto } from "./dto/update-coffee.dto"
import { Inject, Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { DataSource, Repository } from "typeorm"
import { CreateCoffeeDto } from "./dto/create-coffee.dto"
import { Coffee } from "./entities/coffee.entity"
import { Flavor } from "./entities/flavor.entity"
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto"
import { Event } from "src/events/entities/event.entity"
import { COFFEE_BRANDS } from "./coffees.constants"
import { /*  ConfigService,  */ ConfigType } from "@nestjs/config"
import coffeesConfig from "./config/coffees.config"

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly dataSource: DataSource, //injected DataSource object to create transaction

    //inject config variables, access configs directly without the get method and get type safety
    @Inject(coffeesConfig.KEY)
    private readonly coffeesConfiguration: ConfigType<typeof coffeesConfig>,
    //When using non-class-based Provider Tokens, use the @Inject decorator to inject the dependency
    @Inject(COFFEE_BRANDS) coffeBrands: string[],
  ) {
    console.log(coffeesConfiguration, ":yfyif")
  }

  async findAll(query: PaginationQueryDto) {
    const { limit, offset } = query

    return await this.coffeeRepository.find({
      relations: {
        flavors: true,
      },
      skip: offset,
      take: limit,
    })
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id: +id },
      relations: { flavors: true },
    })
    if (!coffee) {
      throw new NotFoundException(`Coffee with the id: ${id} not found`)
    }
    return coffee
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
    )
    const coffee = this.coffeeRepository.create({ ...createCoffeeDto, flavors })
    return this.coffeeRepository.save(coffee)
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto &&
      (await Promise.all(
        updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
      ))
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    })
    if (!coffee) {
      throw new NotFoundException(`Coffee with the id: ${id} not found`)
    }
    this.coffeeRepository.save(coffee)
  }

  async remove(id: string) {
    const coffee = await this.findOne(id)
    return this.coffeeRepository.remove(coffee)
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.dataSource.createQueryRunner()

    await queryRunner.connect()

    await queryRunner.startTransaction()

    try {
      coffee.recommendations++

      const recommendEvent = new Event()

      recommendEvent.name = "recommend_coffee"
      recommendEvent.type = "coffee"
      recommendEvent.payload = { coffeeId: coffee.id }

      await queryRunner.manager.save(coffee)
      await queryRunner.manager.save(recommendEvent)

      await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    })

    if (existingFlavor) {
      return existingFlavor
    }

    return this.flavorRepository.create({ name })
  }
}

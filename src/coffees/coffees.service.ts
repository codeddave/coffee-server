import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateCoffeeDto } from "./dto/create-coffee.dto"
import { Coffee } from "./entities/coffee.entity"

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}
  async findAll() {
    return await this.coffeeRepository.find()
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({ where: { id: +id } })
    if (!coffee) {
      throw new NotFoundException(`Coffee with the id: ${id} `)
    }
    return coffee
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDto)
    return this.coffeeRepository.save(coffee)
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id)
    if (existingCoffee) {
      // update the existing entity
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex(item => item.id === +id)
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1)
    }
  }
}

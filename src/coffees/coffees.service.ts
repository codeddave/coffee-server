import { UpdateCoffeeDto } from "./dto/update-coffee.dto"
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { CreateCoffeeDto } from "./dto/create-coffee.dto"
import { Coffee } from "./entities/coffee.entity"

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
  ) {}

  async findAll() {
    return await this.coffeeModel.find()
  }

  async findOne(id: string) {
    const coffee = await this.coffeeModel.findOne({ _id: id })
    if (!coffee) {
      throw new NotFoundException(`Coffee with the id: ${id} `)
    }
    return coffee
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    await this.coffeeModel.create(createCoffeeDto)
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = await this.findOne(id)
    if (existingCoffee) {
      // update the existing entity
    }
  }

  async remove(id: string) {
    await this.coffeeModel.findByIdAndRemove(id)
  }
}

import { UpdateCoffeeDto } from "./dto/update-coffee.dto"
import { Injectable, NotFoundException } from "@nestjs/common"
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
      throw new NotFoundException(`Coffee with the id: ${id} not found `)
    }
    return coffee
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    await this.coffeeModel.create(createCoffeeDto)
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const existingCoffee = await this.coffeeModel.findOneAndUpdate(
      { _id: id },
      updateCoffeeDto,
      { new: true },
    )
    if (!existingCoffee) {
      throw new NotFoundException(`Coffee with the id: ${id} not found `)
    }
  }

  async remove(id: string) {
    await this.coffeeModel.findByIdAndRemove(id)
  }
}

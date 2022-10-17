import { UpdateCoffeeDto } from "./dto/update-coffee.dto"
import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectConnection, InjectModel } from "@nestjs/mongoose"
import { Connection, Model } from "mongoose"
import { CreateCoffeeDto } from "./dto/create-coffee.dto"
import { Coffee } from "./entities/coffee.entity"
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto"
import { Event } from "src/events/entities/event.entity"

@Injectable()
export class CoffeesService {
  constructor(
    @InjectModel(Coffee.name) private readonly coffeeModel: Model<Coffee>,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    const { pageNumber, limit } = paginationQuery

    const skip = limit * (pageNumber - 1)
    return await this.coffeeModel.find().skip(skip).limit(limit)
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

  async recommendCoffee(coffee: Coffee) {
    const session = await this.connection.startSession()
    session.startTransaction()

    try {
      coffee.recommendations++
      this.eventModel.create(
        {
          name: "recommend_coffee",
          type: "coffee",
          payload: { coffeeId: coffee.id },
        },
        { session },
      )
      coffee.save({ session })
      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
    } finally {
      await session.endSession()
    }
  }
}

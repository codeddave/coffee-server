import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  // Query,
} from "@nestjs/common"
import { CoffeesService } from "./coffees.service"
import { CreateCoffeeDto } from "./dto/create-coffee.dto"
@Controller("coffees")
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll(/* @Query() query */) {
    //const { limit, offset } = query
    return this.coffeesService.findAll()
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.coffeesService.findOne(id)
  }
  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto)
  }
  @Patch(":id")
  update(@Param("id") id: string, @Body() body) {
    return this.coffeesService.update(id, body)
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.coffeesService.remove(id)
  }
}

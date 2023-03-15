import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { Public } from "src/common/decorators/public.decorator"
import { PaginationQueryDto } from "src/common/dto/pagination-query.dto"
import { CoffeesService } from "./coffees.service"
import { CreateCoffeeDto } from "./dto/create-coffee.dto"
import { UpdateCoffeeDto } from "./dto/update-coffee.dto"

@Controller("coffees")
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Public()
  @Get()
  async findAll(@Query() query: PaginationQueryDto) {
    //offset/skip
    await new Promise(resolve => setTimeout(resolve, 5000))
    return this.coffeesService.findAll(query)
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
  update(
    @Param("id") id: string,
    @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeesService.update(id, updateCoffeeDto)
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.coffeesService.remove(id)
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common"
import { CoffeesService } from "./coffees.service"
@Controller("coffees")
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get()
  findAll(@Query() query) {
    const { limit, offset } = query
    return `This action returns all coffees. Limit: ${limit}, offset: ${offset}`
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return `This action returns #${id} coffee`
  }
  @Post()
  create(@Body() body) {
    return body
  }
  @Patch(":id")
  update(@Param("id") id: string, @Body() body) {
    return `This action updates #${id} coffee`
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return `This action deletes #${id} coffee`
  }
}

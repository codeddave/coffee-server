import { ParseIntPipe } from "./../common/pipes/parse-int.pipe"
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
import { Protocol } from "../common/decorators/protocol.decorator"
import {
  ApiForbiddenResponse /* ApiResponse */,
  ApiTags,
} from "@nestjs/swagger"

@ApiTags("coffees")
@Controller("coffees")
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  // @ApiResponse({status:403, description:"Forbidden"})
  @ApiForbiddenResponse({ description: "Forbidden" })
  @Public()
  @Get()
  async findAll(
    @Protocol() protocol: string,
    @Query() query: PaginationQueryDto,
  ) {
    console.log(protocol)
    //offset/skip
    //await new Promise(resolve => setTimeout(resolve, 5000))
    return this.coffeesService.findAll(query)
  }
  @Public()
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.coffeesService.findOne("" + id)
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

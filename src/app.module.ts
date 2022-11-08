import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { CoffeesModule } from "./coffees/coffees.module"

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: "",
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

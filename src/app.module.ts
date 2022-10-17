import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { CoffeesModule } from "./coffees/coffees.module"

@Module({
  imports: [
    CoffeesModule,
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/coffee-server"),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

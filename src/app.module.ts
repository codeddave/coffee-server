import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { CoffeesModule } from "./coffees/coffees.module"
import { CoffeeRatingModule } from "./coffee-rating/coffee-rating.module"
import { DatabaseModule } from "./database/database.module"
import { ConfigModule } from "@nestjs/config"
import * as Joi from "joi"
import appConfig from "./config/app.config"

@Module({
  imports: [
    /*   
 specify custom path
 ConfigModule.forRoot({
      envFilePath: ".environment" you can specify multiple paths by passing an array of strings. 
    }), */
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
    }),
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: false, //disable this in prod
    }),
    CoffeeRatingModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

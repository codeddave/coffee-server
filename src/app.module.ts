import { Module, ValidationPipe } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { CoffeesModule } from "./coffees/coffees.module"
import { CoffeeRatingModule } from "./coffee-rating/coffee-rating.module"
import { DatabaseModule } from "./database/database.module"
import { ConfigModule } from "@nestjs/config"
import * as Joi from "joi"
import appConfig from "./config/app.config"
import { APP_PIPE } from "@nestjs/core"
import { CommonModule } from "./common/common.module"

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "postgres",
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: false, //disable this in prod
      }),
    }),
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

    CoffeeRatingModule,
    DatabaseModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}

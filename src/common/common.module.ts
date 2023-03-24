import { ConfigModule } from "@nestjs/config"
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common"
import { APP_GUARD } from "@nestjs/core"
import { ApiKeyGuard } from "./guards/api-key.guard"
import { LoggingMiddleware } from "./middleware/logging.middleware"

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("*") //apply middleware to all route paths
    // consumer.apply(LoggingMiddleware).forRoutes('coffees') //apply to only routes with coffees prefix
    consumer.apply(LoggingMiddleware).exclude("coffees").forRoutes("*") //exclude only routes with coffees prefix: ;

    //   consumer
    //     .apply(LoggingMiddleware)
    //     .forRoutes({ path: "coffees", method: RequestMethod.GET }) //apply to only GET method routes with coffees prefix: ;
    //
  }
}

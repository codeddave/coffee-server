import { ConfigModule } from "@nestjs/config"
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
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
  }
}

import { HttpExceptionFilter } from "./common/filters/http-exception.filter"
import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ApiKeyGuard } from "./common/guards/api-key.guard"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      /*    transformOptions:{
        enableImplicitConversion: true
      } automatically converts types instead of manually doing conversions using @Type(()=> ) */
    }),
  )
  app.useGlobalFilters(new HttpExceptionFilter()),
    app.useGlobalGuards(new ApiKeyGuard())
  await app.listen(4000)
}
bootstrap()

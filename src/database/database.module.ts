import { DynamicModule, Module } from "@nestjs/common"
import { DataSource, DataSourceOptions } from "typeorm"

// using Nest's Dynamic module features, consuming modules can use an API to control how this Database module is customized when imported.
@Module({})
export class DatabaseModule {
  static register(options: DataSourceOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: "CONNECTION",
          useValue: new DataSource(options).initialize(),
        },
      ],
    }
  }
}

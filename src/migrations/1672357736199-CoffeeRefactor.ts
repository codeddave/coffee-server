import { MigrationInterface, QueryRunner } from "typeorm"

export class CoffeeRefactor1672357736199 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "brand" TO "brandino"`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "brandino" TO "brand"`,
    )
  }
}

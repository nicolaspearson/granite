import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameUserUuidColumn1638172296754 implements MigrationInterface {
  name = 'RenameUserUuidColumn1638172296754';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "consents"."event" DROP CONSTRAINT "FK_0d234a390de474ea15a8654b881"`,
    );
    await queryRunner.query(`DROP INDEX "consents"."IDX_EVENT_USER_UUID"`);
    await queryRunner.query(
      `ALTER TABLE "consents"."event" RENAME COLUMN "userUuid" TO "user_uuid"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_EVENT_USER_UUID" ON "consents"."event" ("user_uuid") `,
    );
    await queryRunner.query(
      `ALTER TABLE "consents"."event" ADD CONSTRAINT "FK_d35e56dc327e943b0a607e6fb34" FOREIGN KEY ("user_uuid") REFERENCES "consents"."user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "consents"."event" DROP CONSTRAINT "FK_d35e56dc327e943b0a607e6fb34"`,
    );
    await queryRunner.query(`DROP INDEX "consents"."IDX_EVENT_USER_UUID"`);
    await queryRunner.query(
      `ALTER TABLE "consents"."event" RENAME COLUMN "user_uuid" TO "userUuid"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_EVENT_USER_UUID" ON "consents"."event" ("userUuid") `,
    );
    await queryRunner.query(
      `ALTER TABLE "consents"."event" ADD CONSTRAINT "FK_0d234a390de474ea15a8654b881" FOREIGN KEY ("userUuid") REFERENCES "consents"."user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}

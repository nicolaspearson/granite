import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEventTable1638109261257 implements MigrationInterface {
  name = 'AddEventTable1638109261257';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "consents"."event_type_enum" AS ENUM('email_notifications', 'sms_notifications')`,
    );
    await queryRunner.query(
      `CREATE TABLE "consents"."event" ("id" SERIAL NOT NULL, "type" "consents"."event_type_enum" NOT NULL, "enabled" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userUuid" uuid NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_EVENT_USER_UUID" ON "consents"."event" ("userUuid") `,
    );
    await queryRunner.query(
      `ALTER TABLE "consents"."event" ADD CONSTRAINT "FK_0d234a390de474ea15a8654b881" FOREIGN KEY ("userUuid") REFERENCES "consents"."user"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "consents"."event" DROP CONSTRAINT "FK_0d234a390de474ea15a8654b881"`,
    );
    await queryRunner.query(`DROP INDEX "consents"."IDX_EVENT_USER_UUID"`);
    await queryRunner.query(`DROP TABLE "consents"."event"`);
    await queryRunner.query(`DROP TYPE "consents"."event_type_enum"`);
  }
}

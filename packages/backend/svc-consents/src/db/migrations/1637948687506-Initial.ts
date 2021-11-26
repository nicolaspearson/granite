import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1637948687506 implements MigrationInterface {
  name = 'Initial1637948687506';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "consents"."user" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(250) NOT NULL, "last_name" character varying(250) NOT NULL, "email_address" character varying(250) NOT NULL, "password" character varying(100) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_a95e949168be7b7ece1a2382fed" PRIMARY KEY ("uuid"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "consents"."user"`);
  }
}

import * as Joi from 'joi';

import { Environment } from '$/enum/environment.enum';

const environments: Environment[] = [
  Environment.Development,
  Environment.Staging,
  Environment.Production,
  Environment.Test,
];

// Joi object keys follow the UPPER snake case convention.
/* eslint-disable @typescript-eslint/naming-convention */
export function getValidationSchema(): Joi.ObjectSchema {
  return Joi.object({
    API_HOST: Joi.string().hostname().description('The server host url').default('127.0.0.1'),
    API_PORT: Joi.number().port().description('The server port').default(3000),
    ENVIRONMENT: Joi.string()
      .valid(...environments)
      .description('The pre-defined deployment environment')
      .required(),
    HTTP_TIMEOUT: Joi.number()
      .description('The maximum number of milliseconds before a request will be timed out.')
      .default(10 * 1000),
    JWT_ALGORITHM: Joi.string()
      .valid('HS256')
      .description('The algorithm used to encode the JWT')
      .default('HS256'),
    JWT_ISSUER: Joi.string().description('The JWT issuer').default('support@granite.com'),
    JWT_SECRET: Joi.string().description('The JWT signing secret').example('secret').required(),
    JWT_TOKEN_EXPIRATION: Joi.string()
      .regex(/^\d+[smhd]$/)
      .description('The validity period of the JWT token')
      .default('15m'),
    LOG_LEVEL: Joi.string()
      .description('Log verbosity level')
      .valid('debug', 'error', 'log', 'verbose', 'warn')
      .default('log'),
    NODE_ENV: Joi.string()
      .valid(...environments)
      .description('The Node runtime environment')
      .default('development'),
    TYPEORM_CONNECTION: Joi.string()
      .valid('postgres')
      .description('The database connection type to be used by TypeORM')
      .default('postgres'),
    TYPEORM_DATABASE: Joi.string()
      .description('The database name to be used by TypeORM')
      .example('granite')
      .required(),
    TYPEORM_DROP_SCHEMA: Joi.boolean()
      .description('Whether or not TypeORM should drop schemas')
      .default(false),
    TYPEORM_ENTITIES: Joi.string()
      .description('The path to the entities to be used by TypeORM')
      .default('src/db/entities/*.ts'),
    TYPEORM_HOST: Joi.string()
      .hostname()
      .description('The database host to be used by TypeORM')
      .required(),
    TYPEORM_MIGRATIONS_DIR: Joi.string()
      .description('The path to the migrations dir to be used by TypeORM')
      .default('dist/db/migrations'),
    TYPEORM_MIGRATIONS_RUN: Joi.boolean()
      .description('Whether or not TypeORM should run migrations')
      .default(true),
    TYPEORM_MIGRATIONS: Joi.string()
      .description('The path to the migrations to be used by TypeORM')
      .default('src/db/migrations/*.ts'),
    TYPEORM_PASSWORD: Joi.string()
      .description('The database password to be used by TypeORM')
      .example('masterkey')
      .required(),
    TYPEORM_PORT: Joi.number()
      .port()
      .description('The database port to be used by TypeORM')
      .example(5432)
      .required(),
    TYPEORM_SCHEMA: Joi.string()
      .description('The database schema to be used by TypeORM')
      .default('consents'),
    TYPEORM_SYNCHRONIZE: Joi.boolean()
      .description('whether or not TypeORM should synchronize the schema')
      .default(false),
    TYPEORM_USERNAME: Joi.string()
      .description('The database username to be used by TypeORM')
      .example('granite')
      .required(),
  });
}
/* eslint-enable @typescript-eslint/naming-convention */

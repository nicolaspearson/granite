import { oneLineTrim } from 'common-tags';
import { ConnectionOptions } from 'typeorm';
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions';

import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import * as webpackConfig from '$/config/typeorm-webpack.config';
import { Environment } from '$/enum/environment.enum';

type MergedConnectionOptions = TypeOrmModuleOptions &
  ConnectionOptions &
  Partial<PostgresConnectionCredentialsOptions>;

type CreateConnectionOptions = {
  useWebpack?: boolean;
};

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  private readonly logger: Logger = new Logger(TypeOrmConfigService.name);

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const connectionOptions = TypeOrmConfigService.creatConnectionOptions({
      useWebpack: true,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...optionsWithoutPassword } = connectionOptions;
    this.logger.debug(oneLineTrim`
      TypeORM options: ${JSON.stringify(optionsWithoutPassword)}
    `);
    return connectionOptions;
  }

  /**
   * Creates the connection configuration that will be used by TypeORM.
   *
   * @returns The {@link MergedConnectionOptions} connection options which TypeORM will use.
   */
  static creatConnectionOptions(options?: CreateConnectionOptions): MergedConnectionOptions {
    const connectionOptions: MergedConnectionOptions = {
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      schema: process.env.TYPEORM_SCHEMA,
      synchronize: false,
      dropSchema: false,
      entities: [process.env.TYPEORM_ENTITIES as string],
      migrations: [process.env.TYPEORM_MIGRATIONS as string],
    };

    if (options?.useWebpack) {
      Object.assign(connectionOptions, {
        entities: webpackConfig.entityFunctions(),
        migrations: webpackConfig.migrationFunctions(),
      } as ConnectionOptions);
    }

    if (process.env.NODE_ENV === Environment.Production) {
      // Production options that will override anything 'unsafe'
      const productionOptions: MergedConnectionOptions = {
        type: 'postgres',
        logging: ['schema', 'error'],
        synchronize: false, // Never auto create database schema
        dropSchema: false, // Never auto drop the schema in each connection
        migrationsRun: true, // Run migrations automatically on each application launch
        keepConnectionAlive: false,
      };
      Object.assign(connectionOptions, productionOptions);
    } else {
      // Development options that will always recreate the schema automatically and skip migrations
      const developmentOptions: MergedConnectionOptions = {
        type: 'postgres',
        logging: ['error', 'schema', 'warn'],
        synchronize: true,
        dropSchema: true,
        migrationsRun: false,
        keepConnectionAlive: true,
      };
      Object.assign(connectionOptions, developmentOptions);
    }

    return connectionOptions;
  }
}

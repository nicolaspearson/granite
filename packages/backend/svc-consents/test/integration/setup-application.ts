import { INestApplication } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { TestingModule } from '@nestjs/testing';

import { ErrorFilter } from 'lib-nest/src';

import { AppModule } from '$/app/app.module';
import { seed } from '$/db/utils/seeder.util';
import { DtoValidationPipe } from '$/pipes/dto-validation.pipe';

import { setupIntegrationTestModule } from '#/integration/setup-integration-test';

interface Options {
  dbSchema: string;
  metadata?: ModuleMetadata;
  overrides?: { token: string; value: unknown }[];
  port?: number;
}

export async function setupApplication(options?: Options): Promise<{
  application: INestApplication;
  module: TestingModule;
}> {
  const setup = await setupIntegrationTestModule({
    dbSchema: options?.dbSchema,
    disableLogging: true,
    enableCors: true,
    enableHelmet: true,
    globalFilters: [new ErrorFilter()],
    globalPipes: [new DtoValidationPipe()],
    globalPrefix: '/v1/consents',
    metadata: {
      ...options?.metadata,
      imports: [...(options?.metadata?.imports ?? []), AppModule],
    },
    overrides: [...(options?.overrides ?? [])],
    seederFn: seed,
  });
  if (options?.port) {
    await setup.application.listen(options.port, 'localhost');
  } else {
    await setup.application.init();
  }
  return {
    application: setup.application,
    module: setup.module,
  };
}

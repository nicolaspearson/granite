import { INestApplication } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { TestingModule } from '@nestjs/testing';

import { AppModule } from '$/app/app.module';

import { setupIntegrationTestModule } from '#/integration/setup-integration-test';

interface Options {
  metadata?: ModuleMetadata;
  overrides?: { token: string; value: unknown }[];
  port?: number;
}

export async function setupApplication(options?: Options): Promise<{
  application: INestApplication;
  module: TestingModule;
}> {
  const setup = await setupIntegrationTestModule({
    disableLogging: true,
    enableCors: true,
    enableHelmet: true,
    globalPrefix: '/v1/consents',
    metadata: {
      ...options?.metadata,
      imports: [...(options?.metadata?.imports ?? []), AppModule],
    },
    overrides: [...(options?.overrides ?? [])],
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

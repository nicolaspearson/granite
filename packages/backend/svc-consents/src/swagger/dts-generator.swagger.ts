import { resolve } from 'path';

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { MainModule } from '$/main.module';
import { convertSwaggerToDts } from '$/swagger/dts-exporter.swagger';

export async function bootstrap(): Promise<void> {
  console.log('Generating declaration files for svc-consents...');
  const app = await NestFactory.create(MainModule, { logger: false });
  const document = SwaggerModule.createDocument(app, new DocumentBuilder().build());
  const outputPath = resolve(process.cwd(), '../../..', 'types/api/svc-consents.d.ts');
  await convertSwaggerToDts({
    document,
    namespace: 'SvcConsentsApi',
    outputPath,
  });
  console.log(`Declaration files generated and exported to: ${outputPath}`);
  process.exit(0);
}

void bootstrap();

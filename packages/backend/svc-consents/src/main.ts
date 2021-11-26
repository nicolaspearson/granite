import helmet from 'helmet';

import { LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ApiGroup } from '$/enum/api-group.enum';
import { Environment } from '$/enum/environment.enum';
import { MainModule } from '$/main.module';

async function bootstrap() {
  const logLevel = [process.env.LOG_LEVEL || 'log'] as LogLevel[];
  const app = await NestFactory.create(MainModule, {
    // Cross-origin resource sharing (CORS) is a mechanism that
    // allows resources to be requested from another domain.
    cors: {
      credentials: true,
      methods: 'DELETE,HEAD,GET,OPTIONS,PATCH,POST,PUT',
      origin: [/localhost$/],
    },
    logger: logLevel,
  });
  const configService = app.get(ConfigService);

  // Helmet can help protect the app from some well-known web
  // vulnerabilities by setting the appropriate HTTP headers.
  app.use(helmet());

  // Set the global API route prefix
  app.setGlobalPrefix('/api/v1/consents');

  // Configure swagger
  const documentBuilder = new DocumentBuilder()
    .setTitle('Consent Management Service API')
    .setDescription('The consent management service RESTful interface.')
    .setVersion('1.0');
  Object.values(ApiGroup).forEach((g) => documentBuilder.addTag(g));
  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('consents', app, document);

  if (process.env.NODE_ENV === Environment.Development) {
    // TODO: Add database seeding mechanism
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await app.listen(configService.get<number>('API_PORT')!, configService.get<string>('API_HOST')!);
}

void bootstrap();

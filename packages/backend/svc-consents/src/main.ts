import * as helmet from 'helmet';
import { Connection } from 'typeorm';

import { LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { getContentResourcePolicy } from '$/config/helmet.config';
import { seed } from '$/db/utils/seeder.util';
import { ApiGroup } from '$/enum/api-group.enum';
import { Environment } from '$/enum/environment.enum';
import { ErrorFilter } from '$/filters/error.filter';
import { HttpTimeoutInterceptor } from '$/interceptors/http-timeout.interceptor';
import { MainModule } from '$/main.module';
import { DtoValidationPipe } from '$/pipes/dto-validation.pipe';

async function bootstrap() {
  const logLevel = [process.env.LOG_LEVEL || 'log'] as LogLevel[];
  const app = await NestFactory.create(MainModule, {
    // Cross-origin resource sharing (CORS) is a mechanism that
    // allows resources to be requested from another domain
    cors: {
      credentials: true,
      methods: 'DELETE,HEAD,GET,OPTIONS,PATCH,POST,PUT',
      origin: [/localhost$/],
    },
    logger: logLevel,
  });
  const configService = app.get(ConfigService);

  // Helmet can help protect the app from some well-known web
  // vulnerabilities by setting the appropriate HTTP headers
  app.use(
    helmet({
      contentSecurityPolicy: getContentResourcePolicy(),
    }),
  );

  // Register global filters, pipes, and interceptors
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalPipes(new DtoValidationPipe());
  app.useGlobalInterceptors(new HttpTimeoutInterceptor());

  // Set the global API route prefix
  app.setGlobalPrefix('/v1/consents');

  // Configure swagger
  const builder = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Consent Management Service API')
    .setVersion('1.0');
  Object.values(ApiGroup).forEach((g) => builder.addTag(g));
  const document = SwaggerModule.createDocument(app, builder.build());
  SwaggerModule.setup('docs/consents', app, document);

  if (process.env.NODE_ENV === Environment.Development) {
    // Seed the database with fixtures in the development environment
    await seed(app.get<Connection>(Connection));
  }

  // Serve the application
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await app.listen(configService.get<number>('API_PORT')!, configService.get<string>('API_HOST')!);
}

void bootstrap();

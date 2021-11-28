import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppModule } from '$/app/app.module';
import { getValidationSchema } from '$/config/env.config';
import { TypeOrmConfigService } from '$/config/typeorm.config';

@Module({
  imports: [
    AppModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validationSchema: getValidationSchema(),
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
})
export class MainModule {}

import { Module } from '@nestjs/common';

import { AuthModule } from '$/auth/auth.module';
import { EventModule } from '$/event/event.module';
import { HealthModule } from '$/health/health.module';
import { UserModule } from '$/user/user.module';

@Module({
  imports: [AuthModule, EventModule, HealthModule, UserModule],
})
export class AppModule {}

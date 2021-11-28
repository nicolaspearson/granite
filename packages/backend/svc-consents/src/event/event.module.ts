import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventRepository } from '$/db/repositories/event.repository';
import { EventController } from '$/event/event.controller';
import { EventService } from '$/event/event.service';

@Module({
  controllers: [EventController],
  imports: [TypeOrmModule.forFeature([EventRepository])],
  providers: [EventService],
})
export class EventModule {}

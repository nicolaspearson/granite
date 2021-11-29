import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EventRepository } from '$/db/repositories/event.repository';
import { ConsentEventResponse } from '$/dto';
import { EventType } from '$/enum/event-type.enum';

@Injectable()
export class EventService {
  private readonly logger: Logger = new Logger(EventService.name);

  constructor(
    @InjectRepository(EventRepository)
    private readonly eventRepository: EventRepository,
  ) {}

  /**
   * Creates a new consent event entry for a user in the database.
   *
   * @param type The {@link EventType} that identifies the consent.
   * @param enabled Whether or not the user has enabled this type of consent.
   * @param userUuid The {@link Uuid} of the user.
   * @returns The created {@link ConsentEventResponse}
   *
   * @throws {@link InternalServerError} If the database transaction fails.
   */
  async create(type: EventType, enabled: boolean, userUuid: Uuid): Promise<ConsentEventResponse> {
    this.logger.log(`Creating event for user with uuid: ${userUuid}`);
    await this.eventRepository.create({
      enabled,
      type,
      userUuid,
    });
    const events = await this.eventRepository.findByUserUuid(userUuid);
    return new ConsentEventResponse({
      uuid: userUuid,
      events,
    });
  }
}

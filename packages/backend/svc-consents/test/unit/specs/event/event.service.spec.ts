import { Test, TestingModule } from '@nestjs/testing';

import { EventRepository } from '$/db/repositories/event.repository';
import { EventService } from '$/event/event.service';

import { eventMockRepo } from '#/utils/mocks/repo.mock';

describe('Event Service', () => {
  let module: TestingModule;
  let service: EventService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        {
          provide: EventRepository,
          useValue: eventMockRepo,
        },
        EventService,
      ],
    }).compile();
    service = module.get<EventService>(EventService);
  });

  beforeEach(jest.clearAllMocks);

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await module.close();
  });
});

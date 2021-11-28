import { Test, TestingModule } from '@nestjs/testing';

import { EventService } from '$/event/event.service';

describe('Event Service', () => {
  let module: TestingModule;
  let service: EventService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [EventService],
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

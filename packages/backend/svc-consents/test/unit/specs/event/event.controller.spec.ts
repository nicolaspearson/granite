import { Test, TestingModule } from '@nestjs/testing';

import { EventController } from '$/event/event.controller';
import { EventService } from '$/event/event.service';

import { eventMockService } from '#/utils/mocks/service.mock';

describe('Event Controller', () => {
  let module: TestingModule;
  let controller: EventController;

  beforeEach(jest.clearAllMocks);

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [EventController],
      providers: [{ provide: EventService, useValue: eventMockService }],
    }).compile();
    controller = module.get<EventController>(EventController);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterAll(async () => {
    await module.close();
  });
});

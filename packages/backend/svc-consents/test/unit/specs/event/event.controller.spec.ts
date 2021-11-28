import { Test, TestingModule } from '@nestjs/testing';

import { EventController } from '$/event/event.controller';

describe('Event Controller', () => {
  let module: TestingModule;
  let controller: EventController;

  beforeEach(jest.clearAllMocks);

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [EventController],
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

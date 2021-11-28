import { Test, TestingModule } from '@nestjs/testing';

import { EventController } from '$/event/event.controller';
import { EventService } from '$/event/event.service';

import {
  authenticatedRequestMock,
  consentEventItemRequestMock,
  consentEventItemResponseMock,
  userMock,
} from '#/utils/fixtures';
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

  describe('create', () => {
    test('should allow a user to create a new consent event', async () => {
      const { id, enabled } = consentEventItemRequestMock;
      const result = await controller.create(authenticatedRequestMock, consentEventItemRequestMock);
      expect(result).toMatchObject(consentEventItemResponseMock);
      expect(eventMockService.create).toHaveBeenCalledWith(id, enabled, userMock.uuid);
    });
  });

  afterAll(async () => {
    await module.close();
  });
});

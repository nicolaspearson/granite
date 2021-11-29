import { Test, TestingModule } from '@nestjs/testing';

import { EventRepository } from '$/db/repositories/event.repository';
import { ConsentEventResponse } from '$/dto';
import { EventService } from '$/event/event.service';

import { consentEventItemRequestMock, eventMock, userMock } from '#/utils/fixtures';
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

  describe('create', () => {
    test('should allow a user to create a new consent event', async () => {
      const { id, enabled } = consentEventItemRequestMock;
      const result = await service.create(id, enabled, userMock.uuid);
      expect(result).toMatchObject(
        new ConsentEventResponse({
          uuid: userMock.uuid,
          events: [{ type: eventMock.type, enabled: eventMock.enabled }],
        }),
      );
      expect(eventMockRepo.create).toHaveBeenCalledWith({
        enabled,
        type: id,
        userUuid: userMock.uuid,
      });
    });
  });

  afterAll(async () => {
    await module.close();
  });
});

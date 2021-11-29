/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { EventRepository } from '$/db/repositories/event.repository';
import { UserRepository } from '$/db/repositories/user.repository';

import { eventMock, userMock, userMockWithEvents } from '#/utils/fixtures';

export const eventMockRepo: Mock<EventRepository> = {
  create: jest.fn().mockResolvedValue(eventMock),
  findByUserUuid: jest.fn().mockResolvedValue([eventMock]),
};

export const userMockRepo: Mock<UserRepository> = {
  create: jest.fn().mockResolvedValue(userMock),
  delete: jest.fn().mockResolvedValue({ affected: 1 }),
  findByUuid: jest.fn().mockResolvedValue(userMockWithEvents),
  findByUuidOrFail: jest.fn().mockResolvedValue(userMockWithEvents),
  findByValidCredentials: jest.fn().mockResolvedValue(userMock),
};

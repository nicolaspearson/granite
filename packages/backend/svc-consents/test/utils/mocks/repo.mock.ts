/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { EventRepository } from '$/db/repositories/event.repository';
import { UserRepository } from '$/db/repositories/user.repository';

import { eventMock, userMock } from '#/utils/fixtures';

export const eventMockRepo: Mock<EventRepository> = {
  create: jest.fn().mockResolvedValue(eventMock),
};

export const userMockRepo: Mock<UserRepository> = {
  create: jest.fn().mockResolvedValue(userMock),
  findByValidCredentials: jest.fn().mockResolvedValue(userMock),
};

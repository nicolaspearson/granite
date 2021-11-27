/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UserRepository } from '$/db/repositories/user.repository';

import { userMock } from '#/utils/fixtures';

export const userMockRepo: Mock<UserRepository> = {
  create: jest.fn().mockResolvedValue(userMock),
};

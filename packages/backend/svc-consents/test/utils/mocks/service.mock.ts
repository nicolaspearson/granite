/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UserService } from '$/user/user.service';

import { userRegistrationResponseMock } from '#/utils/fixtures';

export const userMockService: Mock<UserService> = {
  register: jest.fn().mockResolvedValue(userRegistrationResponseMock),
};

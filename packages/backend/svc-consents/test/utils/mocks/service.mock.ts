/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AuthService } from '$/auth/auth.service';
import { EventService } from '$/event/event.service';
import { TokenService } from '$/token/token.service';
import { UserService } from '$/user/user.service';

import {
  consentEventItemResponseMock,
  jwtResponseMock,
  jwtTokenMock,
  userProfileResponseWithEventsMock,
  userRegistrationResponseMock,
} from '#/utils/fixtures';

export const authMockService: Mock<AuthService> = {
  authenticate: jest.fn().mockResolvedValue(jwtResponseMock),
};

export const eventMockService: Mock<EventService> = {
  create: jest.fn().mockResolvedValue(consentEventItemResponseMock),
};

export const tokenMockService: Mock<TokenService> = {
  generate: jest.fn().mockResolvedValue(jwtTokenMock),
};

export const userMockService: Mock<UserService> = {
  delete: jest.fn().mockResolvedValue(undefined),
  profile: jest.fn().mockResolvedValue(userProfileResponseWithEventsMock),
  register: jest.fn().mockResolvedValue(userRegistrationResponseMock),
};

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AuthService } from '$/auth/auth.service';
import { TokenService } from '$/token/token.service';
import { UserService } from '$/user/user.service';

import { jwtResponseMock, jwtTokenMock, userRegistrationResponseMock } from '#/utils/fixtures';

export const authMockService: Mock<AuthService> = {
  authenticate: jest.fn().mockResolvedValue(jwtResponseMock),
};

export const tokenMockService: Mock<TokenService> = {
  generate: jest.fn().mockResolvedValue(jwtTokenMock),
};

export const userMockService: Mock<UserService> = {
  register: jest.fn().mockResolvedValue(userRegistrationResponseMock),
};

import User from '$/db/entities/user.entity';
import { UserRegistrationRequest, UserRegistrationResponse } from '$/dto';

const now = new Date();

// Health
export const healthCheckResponseMock = { status: 'OK' };

// User
export const userMock: User = {
  uuid: '7a39a121-fdbf-45db-9353-a006bde4261a' as Uuid,
  email: 'u1.integration@example.com' as Email,
  password: 'secret',
  createdAt: now,
};

export const userRegistrationRequestMock: UserRegistrationRequest = {
  email: userMock.email,
  password: userMock.password,
};

export const userRegistrationResponseMock = new UserRegistrationResponse({
  uuid: userMock.uuid,
  email: userMock.email,
  consents: [],
});

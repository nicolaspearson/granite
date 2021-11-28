import User from '$/db/entities/user.entity';
import {
  JwtResponse,
  LoginRequest,
  UserRegistrationRequest,
  UserRegistrationResponse,
} from '$/dto';

const now = new Date();

// Database entities
export const userMock: User = {
  uuid: '7a39a121-fdbf-45db-9353-a006bde4261a' as Uuid,
  email: 'u1.integration@example.com' as Email,
  password: 'secret',
  createdAt: now,
};

// Token
export const jwtTokenMock =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMzQzYzZhYzUtMmI3Mi00YzQxLWE5ZWItMjhmNWFlNDlhZjgwIiwiaWF0IjoxNjM4MDkxNjEzLCJleHAiOjE2MzgwOTI1MTMsImlzcyI6InN1cHBvcnRAZ3Jhbml0ZS5jb20iLCJqdGkiOiJiZDZiMzMzZS04NWZkLTQ3YzgtOWMxMy03NDhhNDZjYTE5MmIifQ.jlMl8fFBUdItwkTiQsna74OqwhC6itNxc8IUyU4Imxs' as JwtToken;

export const jwtPayloadMock: SvcConsents.JwtPayload = {
  uuid: userMock.uuid,
};

// Auth
export const loginRequestMock: LoginRequest = {
  email: userMock.email,
  password: userMock.password,
};

export const jwtResponseMock = new JwtResponse({ token: jwtTokenMock });

// Health
export const healthCheckResponseMock = { status: 'OK' };

// User
export const userRegistrationRequestMock: UserRegistrationRequest = {
  email: userMock.email,
  password: userMock.password,
};

export const userRegistrationResponseMock = new UserRegistrationResponse({
  uuid: userMock.uuid,
  email: userMock.email,
  consents: [],
});

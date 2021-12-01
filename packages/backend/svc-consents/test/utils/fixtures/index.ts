import { Request } from 'express';

import Event from '$/db/entities/event.entity';
import User from '$/db/entities/user.entity';
import {
  ConsentEventItemRequest,
  ConsentEventItemResponse,
  ConsentEventResponse,
  HealthCheckResponse,
  JwtResponse,
  LoginRequest,
  UserProfileResponse,
  UserRegistrationRequest,
  UserRegistrationResponse,
} from '$/dto';
import { EventType } from '$/enum/event-type.enum';

const now = new Date();

// Database entities
export const userMock: Omit<User, 'events'> = {
  uuid: '7a39a121-fdbf-45db-9353-a006bde4261a' as Uuid,
  email: 'test@example.com' as Email,
  password: 'myS3cretP@55w0rd!',
  createdAt: now,
};

export const eventMock: Event = {
  id: 1,
  type: EventType.Email,
  enabled: true,
  createdAt: now,
  user: { ...userMock, events: [] },
};

export const userMockWithEvents: User = {
  ...userMock,
  events: [eventMock],
};

// ----------------------------

// Token
export const jwtTokenMock =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMzQzYzZhYzUtMmI3Mi00YzQxLWE5ZWItMjhmNWFlNDlhZjgwIiwiaWF0IjoxNjM4MDkxNjEzLCJleHAiOjE2MzgwOTI1MTMsImlzcyI6InN1cHBvcnRAZ3Jhbml0ZS5jb20iLCJqdGkiOiJiZDZiMzMzZS04NWZkLTQ3YzgtOWMxMy03NDhhNDZjYTE5MmIifQ.jlMl8fFBUdItwkTiQsna74OqwhC6itNxc8IUyU4Imxs' as JwtToken;

export const jwtPayloadMock = {
  uuid: userMock.uuid,
} as SvcConsents.JwtPayload;

// Auth
export const loginRequestMock = {
  email: userMock.email,
  password: userMock.password,
} as LoginRequest;

export const jwtResponseMock = new JwtResponse({ token: jwtTokenMock });

// Event
export const consentEventItemRequestMock: ConsentEventItemRequest = {
  id: eventMock.type,
  enabled: eventMock.enabled,
};

export const consentEventItemResponseMock = new ConsentEventItemResponse({
  type: eventMock.type,
  enabled: eventMock.enabled,
});

export const consentEventResponseMock = new ConsentEventResponse({
  uuid: userMock.uuid,
  events: [eventMock],
});

// Health
export const healthCheckResponseMock = new HealthCheckResponse({ status: 'OK' });

// User
export const userProfileResponseMock = new UserProfileResponse({
  uuid: userMock.uuid,
  email: userMock.email,
  events: [],
});

export const userProfileResponseWithEventsMock = new UserProfileResponse({
  uuid: userMock.uuid,
  email: userMock.email,
  events: [eventMock],
});

export const userRegistrationRequestMock = {
  email: userMock.email,
  password: userMock.password,
} as UserRegistrationRequest;

export const userRegistrationResponseMock = new UserRegistrationResponse({
  uuid: userMock.uuid,
  email: userMock.email,
  events: [],
});

// ----------------------------

// Express

export const requestMock = {
  body: {},
  params: {},
  query: {},
} as Request;

export const authenticatedRequestMock = {
  ...requestMock,
  userUuid: userMock.uuid,
} as Request;

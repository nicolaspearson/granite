import * as request from 'supertest';

import { HttpStatus, INestApplication } from '@nestjs/common';

import { ConsentEventItemRequest, JwtResponse } from '$/dto';
import { EventType } from '$/enum/event-type.enum';

import { getJwt } from '#/integration/auth.util';
import { setupApplication } from '#/integration/setup-application';
import { jwtResponseMock } from '#/utils/fixtures';

describe('Event Module', () => {
  let app: INestApplication;
  let jwt: JwtResponse;

  const baseUrl = '/v1/consents/events';

  beforeEach(jest.clearAllMocks);

  beforeAll(async () => {
    const setup = await setupApplication({ dbSchema: 'integration_event' });
    app = setup.application;
    jwt = await getJwt(app);
  });

  describe(`POST ${baseUrl}`, () => {
    test('[201] => should allow a user to create a new consent event', async () => {
      expect(jwt.token).toBeDefined();
      const res = await request(app.getHttpServer())
        .post(baseUrl)
        .set('Authorization', `Bearer ${jwt.token}`)
        .send({
          id: EventType.Email,
          enabled: true,
        } as ConsentEventItemRequest)
        .expect(HttpStatus.CREATED);
      expect(res.body).toMatchObject({
        id: EventType.Email,
        enabled: true,
      });
    });

    test('[400] => should throw a bad request error if validation fails', async () => {
      expect(jwt.token).toBeDefined();
      const res = await request(app.getHttpServer())
        .post(baseUrl)
        .set('Authorization', `Bearer ${jwt.token}`)
        .send({
          id: EventType.Email,
        } as ConsentEventItemRequest);
      expect(res.status).toEqual(HttpStatus.BAD_REQUEST);
    });

    test('[401] => should throw an unauthorized error if a valid jwt is not provided', async () => {
      expect(jwt.token).toBeDefined();
      const res = await request(app.getHttpServer())
        .post(baseUrl)
        .set('Authorization', `Bearer ${jwtResponseMock.token}`)
        .send({
          id: EventType.Email,
          enabled: true,
        } as ConsentEventItemRequest);
      expect(res.status).toEqual(HttpStatus.UNAUTHORIZED);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
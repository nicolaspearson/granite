/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as request from 'supertest';

import { HttpStatus, INestApplication } from '@nestjs/common';

import { userFixtures } from '$/db/fixtures/user.fixture';
import { JwtResponse, LoginRequest } from '$/dto';

import { setupApplication } from '#/integration/setup-application';

describe('Auth Module', () => {
  let app: INestApplication;

  const baseUrl = '/v1/consents/auth';

  beforeEach(jest.clearAllMocks);

  beforeAll(async () => {
    const setup = await setupApplication({ dbSchema: 'integration_auth' });
    app = setup.application;
  });

  describe(`POST ${baseUrl}/login`, () => {
    test('[200] => should allow a user to login', async () => {
      const res = await request(app.getHttpServer())
        .post(`${baseUrl}/login`)
        .send({
          email: userFixtures[0].email,
          password: 'myS3cretP@55w0rd!',
        } as LoginRequest)
        .expect(HttpStatus.OK);
      expect(res.body).toMatchObject({
        token: expect.any(String),
      } as JwtResponse);
    });

    test('[400] => should throw a bad request error if validation fails', async () => {
      const res = await request(app.getHttpServer())
        .post(`${baseUrl}/login`)
        .send({ email: 'invalid-email' } as LoginRequest);
      expect(res.status).toEqual(HttpStatus.BAD_REQUEST);
    });

    test("[404] => should throw a not found error if the user's credentials are invalid", async () => {
      const res = await request(app.getHttpServer())
        .post(`${baseUrl}/login`)
        .send({
          email: userFixtures[0].email,
          password: 'invalid-password',
        } as LoginRequest);
      expect(res.status).toEqual(HttpStatus.NOT_FOUND);
    });

    test('[404] => should throw a not found error if the user does not exist', async () => {
      const res = await request(app.getHttpServer())
        .post(`${baseUrl}/login`)
        .send({
          email: 'brand-new-user@example.com',
          password: 'myS3cretP@55w0rd!',
        } as LoginRequest);
      expect(res.status).toEqual(HttpStatus.NOT_FOUND);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

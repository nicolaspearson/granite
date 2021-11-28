import * as request from 'supertest';

import { HttpStatus, INestApplication } from '@nestjs/common';

import { userFixtures } from '$/db/fixtures/user.fixture';
import { LoginRequest } from '$/dto';

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
          password: 'secret',
        } as LoginRequest)
        .expect(HttpStatus.OK);
      expect(res.body).toMatchObject({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        token: expect.any(String),
      });
    });

    test('[400] => should throw a bad request error if validation fails', async () => {
      const res = await request(app.getHttpServer())
        .post(`${baseUrl}/login`)
        .send({ email: 'invalid' } as LoginRequest);
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
          email: 'brand-new@example.com',
          password: 'secret',
        } as LoginRequest);
      expect(res.status).toEqual(HttpStatus.NOT_FOUND);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

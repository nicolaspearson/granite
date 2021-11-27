import * as request from 'supertest';

import { HttpStatus, INestApplication } from '@nestjs/common';

import { userFixtures } from '$/db/fixtures/user.fixture';
import { UserRegistrationRequest } from '$/dto';

import { setupApplication } from '#/integration/setup-application';
import { userRegistrationRequestMock } from '#/utils/fixtures';

describe('User Module', () => {
  let app: INestApplication;

  const baseUrl = '/v1/consents/user';

  beforeEach(jest.clearAllMocks);

  beforeAll(async () => {
    const setup = await setupApplication({ dbSchema: 'integration_user' });
    app = setup.application;
  });

  describe(`POST ${baseUrl}/registration`, () => {
    test('[201] => should allow a user to register', async () => {
      const res = await request(app.getHttpServer())
        .post(`${baseUrl}/registration`)
        .send(userRegistrationRequestMock)
        .expect(HttpStatus.CREATED);
      expect(res.body).toMatchObject({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: expect.any(String),
        email: userRegistrationRequestMock.email,
        consents: [],
      });
    });

    test('[400] => should throw a bad request error if validation fails', async () => {
      const res = await request(app.getHttpServer())
        .post(`${baseUrl}/registration`)
        .send({ email: 'invalid' } as UserRegistrationRequest);
      expect(res.status).toEqual(HttpStatus.BAD_REQUEST);
    });

    test('[400] => should throw a bad request error if the user already fails', async () => {
      const res = await request(app.getHttpServer())
        .post(`${baseUrl}/registration`)
        .send({
          email: userFixtures[0].email,
          password: userFixtures[0].password,
        } as UserRegistrationRequest);
      expect(res.status).toEqual(HttpStatus.BAD_REQUEST);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

import * as request from 'supertest';

import { HttpStatus, INestApplication } from '@nestjs/common';

import { userFixtures } from '$/db/fixtures/user.fixture';
import {
  ConsentEventItemResponse,
  UserProfileResponse,
  UserRegistrationRequest,
  UserRegistrationResponse,
} from '$/dto';
import { EventType } from '$/enum/event-type.enum';

import { getJwt } from '#/integration/auth.util';
import { setupApplication } from '#/integration/setup-application';
import { jwtResponseMock } from '#/utils/fixtures';

describe('User Module', () => {
  let app: INestApplication;

  const baseUrl = '/v1/consents';

  beforeEach(jest.clearAllMocks);

  beforeAll(async () => {
    const setup = await setupApplication({ dbSchema: 'integration_user' });
    app = setup.application;
  });

  describe(`GET ${baseUrl}/user`, () => {
    test('[200] => should allow a user to retrieve their profile (without consent events)', async () => {
      const jwt = await getJwt(app, { email: userFixtures[0].email as Email, password: 'secret' });
      expect(jwt.token).toBeDefined();
      const res = await request(app.getHttpServer())
        .get(`${baseUrl}/user`)
        .set('Authorization', `Bearer ${jwt.token}`)
        .expect(HttpStatus.OK);
      expect(res.body).toMatchObject({
        id: userFixtures[0].uuid,
        email: userFixtures[0].email,
        consents: [] as ConsentEventItemResponse[],
      } as UserProfileResponse);
    });

    test('[200] => should allow a user to retrieve their profile (with consent events)', async () => {
      const jwt = await getJwt(app, { email: userFixtures[1].email as Email, password: 'secret' });
      expect(jwt.token).toBeDefined();
      const res = await request(app.getHttpServer())
        .get(`${baseUrl}/user`)
        .set('Authorization', `Bearer ${jwt.token}`)
        .expect(HttpStatus.OK);
      expect(res.body).toMatchObject({
        id: userFixtures[1].uuid,
        email: userFixtures[1].email,
        consents: [
          {
            id: EventType.Email,
            enabled: true,
          } as ConsentEventItemResponse,
        ],
      } as UserProfileResponse);
    });

    test('[401] => should throw an unauthorized error if a valid jwt is not provided', async () => {
      const res = await request(app.getHttpServer())
        .get(`${baseUrl}/user`)
        .set('Authorization', `Bearer ${jwtResponseMock.token}`);
      expect(res.status).toEqual(HttpStatus.UNAUTHORIZED);
    });
  });

  describe(`DELETE ${baseUrl}/user`, () => {
    test('[204] => should allow a user to delete their account', async () => {
      const jwt = await getJwt(app, { email: userFixtures[2].email as Email, password: 'secret' });
      expect(jwt.token).toBeDefined();
      const res = await request(app.getHttpServer())
        .delete(`${baseUrl}/user`)
        .set('Authorization', `Bearer ${jwt.token}`)
        .expect(HttpStatus.NO_CONTENT);
      expect(res.body).toMatchObject({});
      // The user should no longer be able to retrieve their profile after deletion
      await request(app.getHttpServer())
        .get(`${baseUrl}/user`)
        .set('Authorization', `Bearer ${jwt.token}`)
        .expect(HttpStatus.NOT_FOUND);
    });

    test('[401] => should throw an unauthorized error if a valid jwt is not provided', async () => {
      const res = await request(app.getHttpServer())
        .delete(`${baseUrl}/user`)
        .set('Authorization', `Bearer ${jwtResponseMock.token}`);
      expect(res.status).toEqual(HttpStatus.UNAUTHORIZED);
    });
  });

  describe(`POST ${baseUrl}/users/registration`, () => {
    test('[201] => should allow a user to register', async () => {
      const newUserRegistrationRequest: UserRegistrationRequest = {
        email: 'new-user@example.com' as Email,
        password: 'secret',
      };
      const res = await request(app.getHttpServer())
        .post(`${baseUrl}/users/registration`)
        .send(newUserRegistrationRequest)
        .expect(HttpStatus.CREATED);
      expect(res.body).toMatchObject({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: expect.any(String),
        email: newUserRegistrationRequest.email,
        consents: [],
      } as UserRegistrationResponse);
    });

    test('[400] => should throw a bad request error if validation fails', async () => {
      const res = await request(app.getHttpServer())
        .post(`${baseUrl}/users/registration`)
        .send({ email: 'invalid' } as UserRegistrationRequest);
      expect(res.status).toEqual(HttpStatus.BAD_REQUEST);
    });

    test('[400] => should throw a bad request error if the user already exists', async () => {
      const existingUserRegistrationRequest: UserRegistrationRequest = {
        email: userFixtures[0].email as Email,
        password: 'secret',
      };
      const res = await request(app.getHttpServer())
        .post(`${baseUrl}/users/registration`)
        .send(existingUserRegistrationRequest);
      expect(res.status).toEqual(HttpStatus.BAD_REQUEST);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

import * as request from 'supertest';

import { HttpStatus, INestApplication } from '@nestjs/common';

import { setupApplication } from '#/integration/setup-application';

describe('Health Module', () => {
  let app: INestApplication;

  const baseUrl = '/v1/consents/health';

  beforeEach(jest.clearAllMocks);

  beforeAll(async () => {
    const setup = await setupApplication({ dbSchema: 'integration_health' });
    app = setup.application;
  });

  test(`${baseUrl} (GET)`, async () => {
    const res = await request(app.getHttpServer()).get(baseUrl).expect(HttpStatus.OK);
    expect(res.body).toEqual({ status: 'OK' });
    return res;
  });

  afterAll(async () => {
    await app.close();
  });
});

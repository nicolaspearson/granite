import * as request from 'supertest';

import { HttpStatus, INestApplication } from '@nestjs/common';

import { setupApplication } from '#/integration/setup-application';
import { healthCheckResponseMock } from '#/utils/fixtures';

describe('Health Module', () => {
  let app: INestApplication;

  const baseUrl = '/v1/consents/health';

  beforeEach(jest.clearAllMocks);

  beforeAll(async () => {
    const setup = await setupApplication({ dbSchema: 'integration_health' });
    app = setup.application;
  });

  describe(`GET ${baseUrl}`, () => {
    test('[200] => should return the health status correctly', async () => {
      const res = await request(app.getHttpServer()).get(baseUrl).expect(HttpStatus.OK);
      expect(res.body).toEqual(healthCheckResponseMock);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
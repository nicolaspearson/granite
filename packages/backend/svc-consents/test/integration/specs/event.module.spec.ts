import * as request from 'supertest';

import { HttpStatus, INestApplication } from '@nestjs/common';

import { setupApplication } from '#/integration/setup-application';
import { healthCheckResponseMock } from '#/utils/fixtures';

describe('Event Module', () => {
  let app: INestApplication;

  const baseUrl = '/v1/events/events';

  beforeEach(jest.clearAllMocks);

  beforeAll(async () => {
    const setup = await setupApplication({ dbSchema: 'integration_event' });
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

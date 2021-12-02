/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
      expect(res.body).toMatchObject(healthCheckResponseMock);
    });

    test('[200] => should set headers correctly', async () => {
      const res = await request(app.getHttpServer()).get(baseUrl).expect(HttpStatus.OK);
      expect(res.header).toMatchObject({
        'access-control-allow-credentials': 'true',
        connection: 'close',
        'content-length': expect.any(String),
        'content-security-policy':
          "default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        'content-type': 'application/json; charset=utf-8',
        date: expect.any(String),
        etag: expect.any(String),
        'expect-ct': 'max-age=0',
        'referrer-policy': 'no-referrer',
        'strict-transport-security': 'max-age=15552000; includeSubDomains',
        vary: 'Origin',
        'x-content-type-options': 'nosniff',
        'x-dns-prefetch-control': 'off',
        'x-download-options': 'noopen',
        'x-frame-options': 'SAMEORIGIN',
        'x-permitted-cross-domain-policies': 'none',
        'x-xss-protection': '0',
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

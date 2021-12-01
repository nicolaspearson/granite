/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as request from 'supertest';

import { INestApplication } from '@nestjs/common';

import { DEFAULT_PASSWORD, userFixtures } from '$/db/fixtures/user.fixture';
import { JwtResponse, LoginRequest } from '$/dto';

export async function getJwt(app: INestApplication, data?: LoginRequest): Promise<JwtResponse> {
  const res = await request(app.getHttpServer())
    .post('/v1/consents/auth/login')
    .send({
      email: data?.email ?? userFixtures[0].email,
      password: data?.password ?? DEFAULT_PASSWORD,
    } as LoginRequest);
  return res.body as JwtResponse;
}

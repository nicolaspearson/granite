import * as request from 'supertest';

import { INestApplication } from '@nestjs/common';

import { userFixtures } from '$/db/fixtures/user.fixture';
import { JwtResponse, LoginRequest } from '$/dto';

export async function getJwt(app: INestApplication): Promise<JwtResponse> {
  const res = await request(app.getHttpServer())
    .post('/v1/consents/auth/login')
    .send({
      email: userFixtures[0].email,
      password: 'secret',
    } as LoginRequest);
  return res.body as JwtResponse;
}
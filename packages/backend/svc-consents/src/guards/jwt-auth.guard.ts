import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { UnauthorizedError } from '$/error';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const authorizationHeader = req.get('authorization');
    if (!authorizationHeader) {
      throw new UnauthorizedError('The JWT is missing from the request.');
    }
    const jwt = authorizationHeader.split('Bearer ')[1];
    const jwtPayload = validate(jwt);
    req.userUuid = jwtPayload.uuid;
    return true;
  }
}

export function validate(jwt: string): SvcConsents.JwtPayload {
  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return verify(jwt, process.env.JWT_SECRET!, {
      ignoreExpiration: false,
    }) as SvcConsents.JwtPayload;
  } catch (error) {
    throw new UnauthorizedError('Invalid JWT provided.');
  }
}

import { Request as IRequest } from 'express/index';

declare module 'express' {
  interface Request extends IRequest {
    userUuid?: Uuid;
  }
}

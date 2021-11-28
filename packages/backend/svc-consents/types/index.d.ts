declare namespace SvcConsents {
  type ExpirationTime = Opaque<'ExpirationTime', string>;

  interface Error {
    code: number;
    errors?: string[] | Record<string, unknown>[];
    message: string;
    name: string;
  }

  export type JwtPayload = {
    uuid: Uuid;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Mock<T> = { [K in keyof T]?: jest.Mock<any> };

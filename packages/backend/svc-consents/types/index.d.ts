declare namespace SvcConsents {
  interface Error {
    code: number;
    errors?: string[] | Record<string, unknown>[];
    message: string;
    name: string;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Mock<T> = { [K in keyof T]?: jest.Mock<any> };

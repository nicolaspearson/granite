declare namespace SvcConsents {
  interface Error {
    code: number;
    errors?: string[] | Record<string, unknown>[];
    message: string;
    name: string;
  }
}

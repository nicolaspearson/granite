/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ConnectionOptions } from 'typeorm';

export type WebpackConnectionOptions = Pick<ConnectionOptions, 'entities' | 'migrations'>;

function importFunctions(requireContext: __WebpackModuleApi.RequireContext) {
  return requireContext
    .keys()
    .sort()
    .map((filename) => {
      const required = requireContext(filename);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return Object.keys(required).reduce((result, exportedKey) => {
        const exported = required[exportedKey];
        if (typeof exported === 'function') {
          return result.concat(exported);
        }
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }, [] as any);
    })
    .flat();
}

export function entityFunctions(): NonNullable<WebpackConnectionOptions['entities']> {
  return importFunctions(require.context('../db/entities/', true, /\.ts$/));
}

export function migrationFunctions(): NonNullable<WebpackConnectionOptions['migrations']> {
  return importFunctions(require.context('../db/migrations/', true, /\.ts$/));
}

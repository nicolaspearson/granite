/* eslint-disable @typescript-eslint/no-explicit-any */
import { stripIndents } from 'common-tags';
import * as dtsGenerator from 'dtsgenerator';
import { writeFile } from 'fs';
import { resolve } from 'path';
import * as prettier from 'prettier';

import { OpenAPIObject } from '@nestjs/swagger';

interface SwaggerToDtsOptions {
  document: OpenAPIObject;
  namespace: string;
  outputPath: string;
}

function writeTextToFile(content: string, filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    writeFile(filePath, content, (error) => {
      if (error) reject(error);
      resolve(undefined);
    });
  });
}

/**
 * Converts the provided Open API document object into a type
 * declaration file and stores it in the provided location.
 */
export async function convertSwaggerToDts(options: SwaggerToDtsOptions): Promise<void> {
  const jsonSchema = dtsGenerator.parseFileContent(JSON.stringify(options.document));
  const schema = dtsGenerator.parseSchema(jsonSchema);
  // We do not need to generate type declarations for the paths
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  (schema.content as any)['paths'] = {};
  const dts = await dtsGenerator.default({
    contents: [schema],
  });
  const prettierConfig = await prettier.resolveConfig(
    resolve(process.cwd(), '../../..', '.prettierrc'),
  );
  const dtsLines = dts.split('\n');
  await writeTextToFile(
    prettier.format(
      stripIndents`
        /* eslint-disable @typescript-eslint/no-explicit-any */
        /**
         * Note: This file is auto generated and should NOT be edited manually.
         */
        declare namespace ${options.namespace} {
          ${dtsLines.slice(2, dtsLines.length - 3).join('\n')}
        }`,
      prettierConfig ?? undefined,
    ),
    options.outputPath,
  );
}

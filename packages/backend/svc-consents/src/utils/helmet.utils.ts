import { ContentSecurityPolicyOptions } from 'helmet/dist/middlewares/content-security-policy';

import { Environment } from '$/enum/environment.enum';

export function getContentResourcePolicy(): boolean | ContentSecurityPolicyOptions {
  if (process.env.ENVIRONMENT !== Environment.Production) {
    return {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    };
  }
  return true;
}

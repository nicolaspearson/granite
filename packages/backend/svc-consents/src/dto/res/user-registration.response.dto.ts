import { ApiProperty } from '@nestjs/swagger';

import { BaseUserResponse } from './base-user.response.dto';
import { ConsentItemResponse } from './consent-item.response.dto';

export class UserRegistrationResponse extends BaseUserResponse {
  @ApiProperty({
    description: "The user's email address.",
    example: 'john.doe@example.com',
    nullable: false,
    required: true,
    type: String,
  })
  readonly email: Email;

  @ApiProperty({
    description: 'The list of user consents.',
    example: [
      {
        id: 'email_notifications',
        enabled: false,
      },
      {
        id: 'sms_notifications',
        enabled: true,
      },
    ],
    isArray: true,
    required: true,
    type: /* istanbul ignore next */ () => ConsentItemResponse,
  })
  readonly consents: ConsentItemResponse[];

  constructor(data: { uuid: Uuid; email: Email; consents: { id: string; enabled: boolean }[] }) {
    super(data);
    this.email = data.email;
    this.consents = data.consents.map((c) => new ConsentItemResponse(c));
  }
}

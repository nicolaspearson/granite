import { ApiProperty } from '@nestjs/swagger';

import { EventType } from '$/enum/event-type.enum';

import { BaseUserResponse } from './base-user.response.dto';
import { ConsentEventItemResponse } from './consent-event-item.response.dto';

export class BaseUserProfileResponse extends BaseUserResponse {
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
    type: /* istanbul ignore next */ () => ConsentEventItemResponse,
  })
  readonly consents: ConsentEventItemResponse[];

  constructor(data: {
    uuid: Uuid;
    email: Email;
    events?: { type: EventType; enabled: boolean }[];
  }) {
    super(data);
    this.email = data.email;
    this.consents = data.events?.map((c) => new ConsentEventItemResponse(c)) || [];
  }
}

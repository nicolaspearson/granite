import { ApiProperty } from '@nestjs/swagger';

import { EventType } from '$/enum/event-type.enum';

import { BaseUserResponse } from './base-user.response.dto';
import { ConsentEventItemResponse } from './consent-event-item.response.dto';

export class ConsentEventResponse {
  @ApiProperty({
    description: "A slim version of the user's profile.",
    example: { id: '343c6ac5-2b72-4c41-a9eb-28f5ae49af80' },
    nullable: false,
    required: true,
    type: /* istanbul ignore next */ () => BaseUserResponse,
  })
  readonly user: BaseUserResponse;

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

  constructor(data: { uuid: Uuid; events?: { type: EventType; enabled: boolean }[] }) {
    this.user = new BaseUserResponse(data);
    this.consents =
      /* istanbul ignore next */ data.events?.map((c) => new ConsentEventItemResponse(c)) ?? [];
  }
}

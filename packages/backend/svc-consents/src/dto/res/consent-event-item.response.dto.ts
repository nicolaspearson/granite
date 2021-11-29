import { ApiProperty } from '@nestjs/swagger';

import { EventType } from '$/enum/event-type.enum';

export class ConsentEventItemResponse {
  @ApiProperty({
    description: 'The id of the consent.',
    enum: EventType,
    examples: ['email_notifications', 'sms_notifications'],
    nullable: false,
    required: true,
    type: String,
  })
  readonly id: EventType;

  @ApiProperty({
    description: 'The state of the consent, i.e. whether or not the user granted consent.',
    examples: [true, false],
    nullable: false,
    required: true,
    type: Boolean,
  })
  readonly enabled: boolean;

  constructor(data: { type: EventType; enabled: boolean }) {
    this.id = data.type;
    this.enabled = data.enabled;
  }
}

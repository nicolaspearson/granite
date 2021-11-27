import { ApiProperty } from '@nestjs/swagger';

export class ConsentItemResponse {
  @ApiProperty({
    description: 'The id of the consent.',
    examples: ['email_notifications', 'sms_notifications'],
    nullable: false,
    required: true,
    type: String,
  })
  readonly id: string;

  @ApiProperty({
    description: 'The state of the consent, i.e. whether or not the user granted consent.',
    examples: [true, false],
    nullable: false,
    required: true,
    type: Boolean,
  })
  readonly enabled: boolean;

  constructor(data: { id: string; enabled: boolean }) {
    this.id = data.id;
    this.enabled = data.enabled;
  }
}

import { IsBoolean, IsEnum, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { EventType } from '$/enum/event-type.enum';

export class ConsentEventItemRequest {
  @ApiProperty({
    description: 'The id (i.e. type internally) of the consent event.',
    enum: EventType,
    required: true,
    type: String,
  })
  @IsEnum(EventType)
  @IsNotEmpty()
  readonly id!: EventType;

  @ApiProperty({
    description: 'Whether or not the consent event with the provided id is enabled or disabled.',
    examples: [true, false],
    required: true,
    type: Boolean,
  })
  @IsBoolean()
  @IsNotEmpty()
  readonly enabled!: boolean;
}

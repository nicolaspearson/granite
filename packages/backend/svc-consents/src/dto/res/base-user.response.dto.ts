import { ApiProperty } from '@nestjs/swagger';

export class BaseUserResponse {
  @ApiProperty({
    description: "The user's unique id.",
    example: '343c6ac5-2b72-4c41-a9eb-28f5ae49af80',
    nullable: false,
    required: true,
    type: String,
  })
  readonly id: Uuid;

  constructor(data: { uuid: Uuid }) {
    this.id = data.uuid;
  }
}

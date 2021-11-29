import { IsEmail, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IsValidPassword } from '$/validators/is-valid-password.validator';

export class BaseAuthRequest {
  @ApiProperty({
    description: "The user's email address.",
    example: 'john.doe@example.com',
    required: true,
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email!: Email;

  @ApiProperty({
    description: "The user's password.",
    example: 'secret',
    required: true,
    type: String,
  })
  @IsValidPassword()
  @IsNotEmpty()
  readonly password!: string;
}

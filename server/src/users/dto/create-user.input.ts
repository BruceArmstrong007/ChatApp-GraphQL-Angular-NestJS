import { matchPassword } from '@app/common';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsEmail,
  MinLength,
  IsAlphanumeric,
  Matches,
  Validate,
} from 'class-validator';

export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  @IsAlphanumeric()
  @Matches(/\d/, {
    message: 'At least one number should be present in the string',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  @Validate(matchPassword, ['password'])
  confirmPassword: string;

  constructor(private assign: Partial<CreateUserInput>) {
    Object.assign(this, assign);
  }
}

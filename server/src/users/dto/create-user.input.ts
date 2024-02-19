import { matchPassword } from '@app/common';
import { Field, InputType } from '@nestjs/graphql';
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

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  username: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  @IsAlphanumeric()
  @Matches(/\d/, {
    message: 'At least one number should be present in the string',
  })
  password: string;

  @Field()
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

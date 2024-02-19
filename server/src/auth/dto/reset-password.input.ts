import { matchPassword } from '@app/common';
import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumberString,
  IsAlphanumeric,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

@InputType()
export class ResetPasswordLinkInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  constructor(private assign: Partial<ResetPasswordLinkInput>) {
    Object.assign(this, assign);
  }
}

@InputType()
export class ResetPasswordInput {
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

  @Field()
  @IsString()
  @IsNumberString()
  @IsNotEmpty()
  token: string;

  constructor(private assign: Partial<ResetPasswordInput>) {
    Object.assign(this, assign);
  }
}

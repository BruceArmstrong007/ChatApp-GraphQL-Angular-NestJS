import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsString, IsNumberString } from 'class-validator';

@InputType()
export class EmailVerificationLinkInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  constructor(private assign: Partial<EmailVerificationLinkInput>) {
    Object.assign(this, assign);
  }
}

@InputType()
export class EmailVerificationInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNumberString()
  @IsNotEmpty()
  token: string;

  constructor(private assign: Partial<EmailVerificationInput>) {
    Object.assign(this, assign);
  }
}

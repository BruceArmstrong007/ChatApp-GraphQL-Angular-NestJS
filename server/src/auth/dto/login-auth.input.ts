import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsAlphanumeric,
  Matches,
} from 'class-validator';

@InputType()
export class LoginAuthInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  username: string;

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
}

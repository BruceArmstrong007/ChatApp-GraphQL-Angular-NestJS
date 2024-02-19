import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsEmail,
  IsOptional,
  MinLength,
} from 'class-validator';

@ObjectType({ isAbstract: true })
@InputType({ isAbstract: true })
export class UpdateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  username?: string;

  @Field()
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @Field()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name?: string;

  @Field()
  @IsOptional()
  @IsString()
  bio?: string;

  @Field()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  profile_url?: string;

  @Field()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  profile_filename?: string;

  constructor(private assign: Partial<UpdateUserInput>) {
    Object.assign(this, assign);
  }
}

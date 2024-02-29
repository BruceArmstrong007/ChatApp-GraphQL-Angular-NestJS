import { Field, InputType } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  MinLength,
  IsNumber,
  IsIn,
} from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  _id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  username?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  bio?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  location?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsIn(['Male', 'Female', 'Others'])
  gender?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  dob?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  age?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  profile_url?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  profile_filename?: string;

  constructor(private assign: Partial<UpdateUserInput>) {
    Object.assign(this, assign);
  }
}

@InputType()
export class UserProfile {
  @Field()
  @IsString()
  @IsNotEmpty()
  filename: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  url: string;

  constructor(private assign: Partial<UserProfile>) {
    Object.assign(this, assign);
  }
}

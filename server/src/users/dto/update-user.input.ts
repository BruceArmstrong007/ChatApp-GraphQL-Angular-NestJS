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

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  username?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

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
  @IsNotEmpty()
  profile_url?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  profile_filename?: string;

  constructor(private assign: Partial<UpdateUserInput>) {
    Object.assign(this, assign);
  }
}

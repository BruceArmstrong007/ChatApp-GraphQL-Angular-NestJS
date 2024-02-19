import { IsString, IsNotEmpty, MaxLength, IsIn } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SearchUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  value: string;

  @Field()
  @IsNotEmpty()
  @IsIn(['email', 'name', '_id', 'username'])
  @IsString()
  type: string;

  constructor(private assign: Partial<SearchUserInput>) {
    Object.assign(this, assign);
  }
}

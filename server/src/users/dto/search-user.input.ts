import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { SearchKeys } from '../database/user.repository';
import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class SearchUserInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  value: string;

  @IsNotEmpty()
  @IsString()
  type: SearchKeys;

  constructor(private assign: Partial<SearchUserInput>) {
    Object.assign(this, assign);
  }
}

import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsEmail,
  IsOptional,
  MinLength,
} from 'class-validator';

export class UpdateUserInput {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  username?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  profile_url?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  profile_filename?: string;

  constructor(private assign: Partial<UpdateUserInput>) {
    Object.assign(this, assign);
  }
}

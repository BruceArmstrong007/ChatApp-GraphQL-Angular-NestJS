import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class ContactsInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  contactID: string;

  constructor(private assign: Partial<ContactsInput>) {
    Object.assign(this, assign);
  }
}

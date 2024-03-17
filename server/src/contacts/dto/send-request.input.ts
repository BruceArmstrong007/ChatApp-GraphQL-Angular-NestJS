import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SendRequestInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  contactID: string;
  
  constructor(private assign: Partial<SendRequestInput>) {
    Object.assign(this, assign);
  }
}

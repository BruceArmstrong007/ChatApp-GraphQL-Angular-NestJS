import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ContactInput {
  @Field()
  contactID: string;
}

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ContactInput {
  @Field()
  contactID: string;

  constructor(private assign: Partial<ContactInput>) {
    Object.assign(this, assign);
  }
}

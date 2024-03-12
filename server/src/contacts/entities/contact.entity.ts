import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Contact {
  @Field(() => ID)
  _id: string;

  @Field()
  sender: string;

  @Field()
  receiver: string;

  @Field()
  status: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

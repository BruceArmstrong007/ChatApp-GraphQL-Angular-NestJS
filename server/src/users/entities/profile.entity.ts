import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Profile {
  @Field(() => ID)
  _id: string;

  @Field()
  filename: string;

  @Field()
  url: string;
}

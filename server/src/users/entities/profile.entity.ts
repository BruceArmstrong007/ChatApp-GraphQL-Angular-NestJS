import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Profile {
  @Field()
  filename: string;

  @Field()
  url: string;
}

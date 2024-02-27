import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Profile } from './profile.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  bio: string;

  @Field()
  name: string;

  @Field()
  verified: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Profile, { nullable: true })
  profile: Profile;
}

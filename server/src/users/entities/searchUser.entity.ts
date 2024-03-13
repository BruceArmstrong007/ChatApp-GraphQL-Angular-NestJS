import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Profile } from './profile.entity';

@ObjectType()
export class SearchUser {
  @Field(() => ID)
  _id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  bio: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  location: string;

  @Field({ nullable: true })
  gender: string;

  @Field({ nullable: true })
  age: number;

  @Field({ nullable: true })
  dob: string;

  @Field({ nullable: true })
  verified: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Profile, { nullable: true })
  profile: Profile;
}

import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Login {
  @Field()
  accessToken: string;

  @Field(() => User, { nullable: true })
  user: User;
}


@ObjectType()
export class Refresh {
  @Field()
  accessToken: string;
}
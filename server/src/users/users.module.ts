import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './database/user.schema';
import { UserRepository } from './database/user.repository';
import { LogoutAuthStrategy } from './strategy/logout-auth.strategy';
import { JwtAuthStrategy } from 'src/auth/strategy/jwt-auth.strategy';

@Module({
  providers: [
    UsersResolver,
    UsersService,
    UserRepository,
    LogoutAuthStrategy,
    JwtAuthStrategy,
  ],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}

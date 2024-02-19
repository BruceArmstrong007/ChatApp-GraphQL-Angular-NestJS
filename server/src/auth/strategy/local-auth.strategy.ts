import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = this.userService.validateUser({ username, password });
    if (!user) {
      throw new UnauthorizedException('Incorrect username  or password.');
    }
    return user;
  }
}

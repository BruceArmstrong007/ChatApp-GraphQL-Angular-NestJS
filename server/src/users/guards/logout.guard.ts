import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Response } from 'express';
@Injectable()
export class LogoutAuthGuard extends AuthGuard('logout') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();
    const response: Response = request['res'];
    if (response) {
      response.clearCookie('isLoggedIn');
      response.clearCookie('refreshToken');
    }
    return request['req'];
  }
}

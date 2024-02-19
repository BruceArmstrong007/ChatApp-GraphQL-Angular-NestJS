import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const getCurrentUserByContext = (context: ExecutionContext) => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);

export type CurrentUserType = {
  _id: string;
  username: string;
  email: string;
  name: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
};

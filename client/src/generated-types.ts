import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateUserInput = {
  confirmPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type EmailVerificationInput = {
  email: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type EmailVerificationLinkInput = {
  email: Scalars['String']['input'];
};

export type Login = {
  __typename?: 'Login';
  accessToken: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type LoginAuthInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  emailVerification: Message;
  emailVerificationLink: Message;
  register: User;
  removeUser: User;
  resetPassword: Message;
  resetPasswordLink: Message;
  updateUser: User;
};


export type MutationEmailVerificationArgs = {
  emailVerificationData: EmailVerificationInput;
};


export type MutationEmailVerificationLinkArgs = {
  emailVerificationLinkData: EmailVerificationLinkInput;
};


export type MutationRegisterArgs = {
  createUserData: CreateUserInput;
};


export type MutationRemoveUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  resetPasswordData: ResetPasswordInput;
};


export type MutationResetPasswordLinkArgs = {
  resetPasswordLinkData: ResetPasswordLinkInput;
};


export type MutationUpdateUserArgs = {
  updateUserData: UpdateUserInput;
};

export type Profile = {
  __typename?: 'Profile';
  filename: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  login: Login;
  refresh: Refresh;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryLoginArgs = {
  loginAuthData: LoginAuthInput;
};


export type QueryUserArgs = {
  findUserData: SearchUserInput;
};


export type QueryUsersArgs = {
  searchUsersData: SearchUserInput;
};

export type Refresh = {
  __typename?: 'Refresh';
  accessToken: Scalars['String']['output'];
};

export type ResetPasswordInput = {
  confirmPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type ResetPasswordLinkInput = {
  email: Scalars['String']['input'];
};

export type SearchUserInput = {
  type: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type UpdateUserInput = {
  _id: Scalars['String']['input'];
  bio?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile_filename?: InputMaybe<Scalars['String']['input']>;
  profile_url?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  bio?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  profile?: Maybe<Profile>;
  username: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type LoginQueryVariables = Exact<{
  LoginAuthData: LoginAuthInput;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'Login', accessToken: string, user?: { __typename?: 'User', name: string } | null } };

export type RegisterMutationVariables = Exact<{
  createUserData: CreateUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', _id: string, username: string, email: string } };

export type ResetPasswordLinkMutationVariables = Exact<{
  resetPasswordLinkData: ResetPasswordLinkInput;
}>;


export type ResetPasswordLinkMutation = { __typename?: 'Mutation', resetPasswordLink: { __typename?: 'Message', message: string } };

export type ResetPasswordMutationVariables = Exact<{
  resetPasswordData: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'Message', message: string } };

export type EmailVerificationLinkMutationVariables = Exact<{
  emailVerificationLinkData: EmailVerificationLinkInput;
}>;


export type EmailVerificationLinkMutation = { __typename?: 'Mutation', emailVerificationLink: { __typename?: 'Message', message: string } };

export type EmailVerificationMutationVariables = Exact<{
  emailVerificationData: EmailVerificationInput;
}>;


export type EmailVerificationMutation = { __typename?: 'Mutation', emailVerification: { __typename?: 'Message', message: string } };

export const LoginDocument = gql`
    query login($LoginAuthData: LoginAuthInput!) {
  login(loginAuthData: $LoginAuthData) {
    accessToken
    user {
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Query<LoginQuery, LoginQueryVariables> {
    document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RegisterDocument = gql`
    mutation register($createUserData: CreateUserInput!) {
  register(createUserData: $createUserData) {
    _id
    username
    email
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RegisterGQL extends Apollo.Mutation<RegisterMutation, RegisterMutationVariables> {
    document = RegisterDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ResetPasswordLinkDocument = gql`
    mutation resetPasswordLink($resetPasswordLinkData: ResetPasswordLinkInput!) {
  resetPasswordLink(resetPasswordLinkData: $resetPasswordLinkData) {
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ResetPasswordLinkGQL extends Apollo.Mutation<ResetPasswordLinkMutation, ResetPasswordLinkMutationVariables> {
    document = ResetPasswordLinkDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ResetPasswordDocument = gql`
    mutation resetPassword($resetPasswordData: ResetPasswordInput!) {
  resetPassword(resetPasswordData: $resetPasswordData) {
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ResetPasswordGQL extends Apollo.Mutation<ResetPasswordMutation, ResetPasswordMutationVariables> {
    document = ResetPasswordDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EmailVerificationLinkDocument = gql`
    mutation emailVerificationLink($emailVerificationLinkData: EmailVerificationLinkInput!) {
  emailVerificationLink(emailVerificationLinkData: $emailVerificationLinkData) {
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EmailVerificationLinkGQL extends Apollo.Mutation<EmailVerificationLinkMutation, EmailVerificationLinkMutationVariables> {
    document = EmailVerificationLinkDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EmailVerificationDocument = gql`
    mutation emailVerification($emailVerificationData: EmailVerificationInput!) {
  emailVerification(emailVerificationData: $emailVerificationData) {
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class EmailVerificationGQL extends Apollo.Mutation<EmailVerificationMutation, EmailVerificationMutationVariables> {
    document = EmailVerificationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
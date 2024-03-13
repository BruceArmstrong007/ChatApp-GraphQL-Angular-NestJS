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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Contact = {
  __typename?: 'Contact';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  receiver: Scalars['String']['output'];
  sender: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ContactInput = {
  contactID: Scalars['String']['input'];
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
  acceptRequest: ResponseMessage;
  cancelRequest: ResponseMessage;
  emailVerification: Message;
  emailVerificationLink: Message;
  register: User;
  rejectRequest: ResponseMessage;
  removeUser: User;
  resetPassword: Message;
  resetPasswordLink: Message;
  seenRequest: ResponseMessage;
  sendRequest: ResponseMessage;
  updateUser: User;
};


export type MutationAcceptRequestArgs = {
  acceptRequestData: ContactInput;
};


export type MutationCancelRequestArgs = {
  cancelRequestData: ContactInput;
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


export type MutationRejectRequestArgs = {
  rejectRequestData: ContactInput;
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


export type MutationSeenRequestArgs = {
  seenRequestData: ContactInput;
};


export type MutationSendRequestArgs = {
  sendRequestData: ContactInput;
};


export type MutationUpdateUserArgs = {
  updateUserData: UpdateUserInput;
};

export type Profile = {
  __typename?: 'Profile';
  createdAt: Scalars['DateTime']['output'];
  filename: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  getAllContacts: Array<Contact>;
  login: Login;
  logout: ResponseMessage;
  refresh: Refresh;
  user?: Maybe<SearchUser>;
  users: Array<SearchUser>;
};


export type QueryGetAllContactsArgs = {
  getAllContactsData: ContactInput;
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

export type ResponseMessage = {
  __typename?: 'ResponseMessage';
  message: Scalars['String']['output'];
};

export type SearchUser = {
  __typename?: 'SearchUser';
  _id: Scalars['ID']['output'];
  age?: Maybe<Scalars['Float']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dob?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  gender?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  profile?: Maybe<Profile>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type SearchUserInput = {
  type: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type UpdateUserInput = {
  _id: Scalars['String']['input'];
  age?: InputMaybe<Scalars['Float']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile_filename?: InputMaybe<Scalars['String']['input']>;
  profile_url?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  age?: Maybe<Scalars['Float']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dob?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  gender?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  profile?: Maybe<Profile>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type RefreshQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshQuery = { __typename?: 'Query', refresh: { __typename?: 'Refresh', accessToken: string } };

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

export type CurrentuserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentuserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', _id: string, name: string, username: string, email: string, bio?: string | null, age?: number | null, gender?: string | null, dob?: string | null, location?: string | null, verified: boolean, createdAt: any, updatedAt: any, profile?: { __typename?: 'Profile', url: string, filename: string, createdAt: any, updatedAt: any } | null } };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: { __typename?: 'ResponseMessage', message: string } };

export type SendRequestMutationVariables = Exact<{
  sendRequestData: ContactInput;
}>;


export type SendRequestMutation = { __typename?: 'Mutation', sendRequest: { __typename?: 'ResponseMessage', message: string } };

export type UpdateUserMutationVariables = Exact<{
  updateUserData: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', _id: string, username: string, name: string, dob?: string | null, age?: number | null, location?: string | null, gender?: string | null, bio?: string | null, profile?: { __typename?: 'Profile', filename: string, url: string } | null } };

export type UserQueryVariables = Exact<{
  FindUserData: SearchUserInput;
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'SearchUser', _id: string, name: string, username: string, email: string, age?: number | null, bio?: string | null, dob?: string | null, location?: string | null, gender?: string | null, verified?: boolean | null, createdAt: any, updatedAt: any, profile?: { __typename?: 'Profile', url: string, filename: string, createdAt: any, updatedAt: any } | null } | null };

export type UsersQueryVariables = Exact<{
  SearchUsersData: SearchUserInput;
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'SearchUser', _id: string, name: string, username: string, email: string, age?: number | null, bio?: string | null, dob?: string | null, location?: string | null, gender?: string | null, verified?: boolean | null, createdAt: any, updatedAt: any, profile?: { __typename?: 'Profile', url: string, filename: string, createdAt: any, updatedAt: any } | null }> };

export const RefreshDocument = gql`
    query refresh {
  refresh {
    accessToken
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RefreshGQL extends Apollo.Query<RefreshQuery, RefreshQueryVariables> {
    document = RefreshDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
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
export const CurrentuserDocument = gql`
    query currentuser {
  currentUser {
    _id
    name
    username
    email
    profile {
      url
      filename
      createdAt
      updatedAt
    }
    bio
    age
    gender
    dob
    location
    verified
    createdAt
    updatedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CurrentuserGQL extends Apollo.Query<CurrentuserQuery, CurrentuserQueryVariables> {
    document = CurrentuserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LogoutDocument = gql`
    query logout {
  logout {
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LogoutGQL extends Apollo.Query<LogoutQuery, LogoutQueryVariables> {
    document = LogoutDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SendRequestDocument = gql`
    mutation sendRequest($sendRequestData: ContactInput!) {
  sendRequest(sendRequestData: $sendRequestData) {
    message
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SendRequestGQL extends Apollo.Mutation<SendRequestMutation, SendRequestMutationVariables> {
    document = SendRequestDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateUserDocument = gql`
    mutation updateUser($updateUserData: UpdateUserInput!) {
  updateUser(updateUserData: $updateUserData) {
    _id
    username
    name
    dob
    age
    location
    gender
    bio
    profile {
      filename
      url
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateUserGQL extends Apollo.Mutation<UpdateUserMutation, UpdateUserMutationVariables> {
    document = UpdateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UserDocument = gql`
    query user($FindUserData: SearchUserInput!) {
  user(findUserData: $FindUserData) {
    _id
    name
    username
    email
    profile {
      url
      filename
      createdAt
      updatedAt
    }
    age
    bio
    dob
    location
    gender
    verified
    createdAt
    updatedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserGQL extends Apollo.Query<UserQuery, UserQueryVariables> {
    document = UserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UsersDocument = gql`
    query users($SearchUsersData: SearchUserInput!) {
  users(searchUsersData: $SearchUsersData) {
    _id
    name
    username
    email
    profile {
      url
      filename
      createdAt
      updatedAt
    }
    age
    bio
    dob
    location
    gender
    verified
    createdAt
    updatedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UsersGQL extends Apollo.Query<UsersQuery, UsersQueryVariables> {
    document = UsersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
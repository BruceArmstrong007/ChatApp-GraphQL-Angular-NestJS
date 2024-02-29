import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache, split } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { Store } from '@ngrx/store';
import { authFeature } from '../../../state/auth/auth.reducer';
import { environment } from '../../../../environments/environment';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { authActions } from '../../../state/auth/auth.action';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
// @ts-ignore
import extractFiles from 'extract-files/extractFiles.mjs';
// @ts-ignore
import isExtractableFile from 'extract-files/isExtractableFile.mjs';

export const factoryFn = (
  store: Store,
  httpLink: HttpLink,
  httpClient: HttpClient
) => {
  const getHeaders = async () => {
    return {
      Accept: 'charset=utf-8',
    };
  };
  const basic = setContext(async () => ({
    headers: {
      ...getHeaders(),
    },
  }));

  const auth = setContext(async (operation, context) => {
    const token = store.selectSignal(authFeature.selectAccessToken);
    if (
      operation.operationName === 'login' ||
      operation.operationName === 'register' ||
      operation.operationName === 'refresh' ||
      operation.operationName === 'emailVerificationLink' ||
      operation.operationName === 'emailVerification' ||
      operation.operationName === 'resetPasswordLink' ||
      operation.operationName === 'resetPassword'
    )
      return {
        headers: {},
      };
    if (!token()) {
      const res: any = await firstValueFrom(
        httpClient.post(
          environment.apiURL,
          {
            operationName: 'refresh',
            query: 'query refresh { refresh { accessToken } }',
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
      );
      const accessToken = res?.data.refresh.accessToken;
      if (accessToken) {
        store.dispatch(authActions.setRefreshToken({ accessToken }));
        return {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      }
    }
    return {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    };
  });

  const http = ApolloLink.from([
    basic,
    auth,
    httpLink.create({
      uri: environment.apiURL,
      withCredentials: true,
      extractFiles: body => extractFiles(body, isExtractableFile),
    }),
  ]);

  const ws = new GraphQLWsLink(
    createClient({
      url: environment.wsURL,
      connectionParams: async () => {
        return await getHeaders();
      },
    })
  );

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    ws,
    http
  );

  return { link, cache: new InMemoryCache() };
};

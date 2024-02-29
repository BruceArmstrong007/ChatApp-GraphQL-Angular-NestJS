import { APOLLO_OPTIONS, Apollo, ApolloModule } from 'apollo-angular';
import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';
import { Store, provideStore } from '@ngrx/store';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomRouterStateSerializer } from './state/router/router-serializer';
import { authFeature } from './state/auth/auth.reducer';
import { userFeature } from './state/user/user.reducer';
import { HttpLink } from 'apollo-angular/http';
import { factoryFn } from './shared/services/apollo/apollo-graphql.service';
import { CookieService } from 'ngx-cookie-service';

export const appConfig: ApplicationConfig = {
  providers: [
    CookieService,
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    importProvidersFrom(ApolloModule, MatSnackBarModule),
    {
      provide: APOLLO_OPTIONS,
      useFactory: factoryFn,
      deps: [Store, HttpLink, HttpClient],
    },
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideStore({
      router: routerReducer,
      auth: authFeature.reducer,
      user: userFeature.reducer,
    }),
    provideRouterStore({ serializer: CustomRouterStateSerializer }),
    provideEffects(),
    isDevMode()
      ? provideStoreDevtools({
          maxAge: 25,
          logOnly: !isDevMode(),
          autoPause: true,
          trace: false,
          traceLimit: 75,
        })
      : [],
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};

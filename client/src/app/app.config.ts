import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../environments/environment';
import { provideServiceWorker } from '@angular/service-worker';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomRouterStateSerializer } from './state/router/router-serializer';
import { authFeature } from './state/auth/auth.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    importProvidersFrom(ApolloModule, MatSnackBarModule),
    provideHttpClient(),
    provideStore({
      router: routerReducer,
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
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.apiURL,
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
};

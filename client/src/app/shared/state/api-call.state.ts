import { computed, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { AlertComponent } from '../components/alert/alert.component';

export type AlertType = 'ERROR' | 'SUCCESS' | 'INFO' | 'WARN';

export interface Alert {
  title: string;
  message: string;
  type: AlertType;
}

export type CallState = 'init' | 'loading' | 'loaded' | { error: string };

export function withCallState() {
  return signalStoreFeature(
    withState<{ callState: CallState }>({ callState: 'init' }),
    withComputed(({ callState }) => ({
      loading: computed(() => callState() === 'loading'),
      loaded: computed(() => callState() === 'loaded'),
      error: computed(() => {
        const state = callState();
        return typeof state === 'object' ? state.error : null;
      }),
    })),
    withMethods(state => {
      const alert = inject(MatSnackBar);

      return {
        setError: (error: string) => {
          patchState(state, saveError(error));
        },
        openAlert: (title: string, message: string, type: AlertType) => {
          alert.openFromComponent(AlertComponent, {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            data: {
              title,
              message,
              type,
            },
          });
        },
      };
    })
  );
}

export function setLoading(): { callState: CallState } {
  return { callState: 'loading' };
}

export function setLoaded(): { callState: CallState } {
  return { callState: 'loaded' };
}

function saveError(error: string): { callState: CallState } {
  return { callState: { error } };
}

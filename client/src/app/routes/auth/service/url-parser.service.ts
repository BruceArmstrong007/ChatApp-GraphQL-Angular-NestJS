import { Injectable, Signal, inject } from '@angular/core';
import { Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectQueryParams } from '../../../state/router/router-selector';

@Injectable({
  providedIn: 'root',
})
export class UrlParserService {
  readonly store = inject(Store);

  constructor() {}

  parseURL() {
    const param: Signal<Params> = this.store.selectSignal(selectQueryParams);
    return param()?.['token'];
  }
}

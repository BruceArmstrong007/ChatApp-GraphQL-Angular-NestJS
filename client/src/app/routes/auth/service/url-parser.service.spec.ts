import { TestBed } from '@angular/core/testing';

import { UrlParserService } from './url-parser.service';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { selectQueryParams } from '../../../state/router/router-selector';

describe('UrlParserService', () => {
  let service: UrlParserService;

  let storeSpy: jasmine.SpyObj<Store>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Store', ['selectSignal']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: Store, useValue: spy }],
    });
    service = TestBed.inject(UrlParserService);
    storeSpy = TestBed.inject(Store) as jasmine.SpyObj<Store>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should parse url', () => {
    // const paramMap = { token: 'exampleToken' };
    // spyOn(service, 'parseURL');
    // service.parseURL();
    // expect(storeSpy.selectSignal).toHaveBeenCalledWith(selectQueryParams);
  });
});

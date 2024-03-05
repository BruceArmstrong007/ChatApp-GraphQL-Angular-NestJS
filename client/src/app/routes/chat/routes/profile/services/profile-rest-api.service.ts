import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileResponse, UploadProfile } from '../profile.types';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { authFeature } from '../../../../../state/auth/auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class ProfileRestApiService {
  private readonly http = inject(HttpClient);
  private readonly store = inject(Store);
  private readonly token = this.store.selectSignal(authFeature.selectAuthState);

  uploadProfile(body: UploadProfile): Observable<ProfileResponse> {
    const endpoint = '/upload/profile';
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token().accessToken, // Replace with your actual access token
      'Custom-Header': 'Custom-Value', // Add any custom headers if needed
    });
    const requestOptions = {
      withCredentials: true,
      origin: environment.fileURL,
      headers,
    };

    const url = environment.fileURL + endpoint;
    const formData = new FormData();
    formData.append('profile', body.profile);
    formData.append('prevFilename', body.prevFilename);
    return this.http.put<ProfileResponse>(url, formData, requestOptions);
  }
}

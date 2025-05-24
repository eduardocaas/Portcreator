import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../models/Credentials';
import { AuthResponse } from '../models/responses/AuthResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly _http: HttpClient) { }

  authenticate(credentials: Credentials) {
    return this._http.post<AuthResponse>(`${environment.apiUrl}/api/auth/signin`, credentials, {
      observe: 'response'
    });
  }
}

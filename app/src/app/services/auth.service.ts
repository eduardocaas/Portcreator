import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../models/auth/Credentials';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { SignupModel } from '../models/auth/SignupModel';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private readonly _http: HttpClient) { }

  authenticate(credentials: Credentials): Observable<boolean> {
    return this._http.post<any>(`${environment.apiUrl}/api/auth/signin`, credentials, httpOptions)
      .pipe(
        tap((resp: any) => {
          if (resp?.token) {
            sessionStorage.setItem('token', resp.token);
            return true;
          }
          else {
            return false;
          }

        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    if (token != null && token != undefined) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false
  }

  signup(signupModel: SignupModel) {
    return this._http.post<any>(`${environment.apiUrl}/api/auth/signup`, signupModel, {
      headers: httpOptions.headers,
      observe: 'response',
      responseType: 'json'
    });
  }
}

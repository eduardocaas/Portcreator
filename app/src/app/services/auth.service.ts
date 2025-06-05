import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../models/auth/Credentials';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';
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
            this.setClaims(resp.token);
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

  logout() {
    sessionStorage.clear();
  }

  setClaims(token: string) {
     const decoded = jwtDecode<any>(token);
     if (decoded?.userId && decoded?.userEmail) {
      sessionStorage.setItem('userId', decoded.userId);
      sessionStorage.setItem('userEmail', decoded.userEmail);
      sessionStorage.setItem('firstAccess', decoded.firstAccess);
     }
  }

  getId(): string | null {
    let id = sessionStorage.getItem('userId');
    if (id) { return id }
    return null;
  }

   getEmail(): string | null {
    let email = sessionStorage.getItem('userEmail');
    if (email) { return email }
    return null;
  }
}

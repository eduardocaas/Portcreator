import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../models/Credentials';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, Observable, of, tap } from 'rxjs';

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
        catchError(error => of(false))
      );
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    if (token != null && token != undefined) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false
  }
}

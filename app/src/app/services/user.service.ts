import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserUpdate } from '../models/admin/UserUpdate';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { ThisReceiver } from '@angular/compiler';
import { throwError } from 'rxjs';
import { UserMessage } from '../models/messages/UserMessage';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly _http: HttpClient,
    private readonly _authService: AuthService) { }

  update(user: UserUpdate) {
    let id = this._authService.getId();
    if (id == null) {
      return throwError(() => new HttpErrorResponse({
        error: UserMessage.ERROR_404,
        status: 404,
        statusText: 'Not Found'
      }));
    }
    return this._http.put<any>(`${environment.apiUrl}/api/users/${id}`, user, {
      headers: httpOptions.headers,
      observe: 'response',
      responseType: 'json'
    })
  }
}

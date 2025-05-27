import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupModel } from '../models/auth/SignupModel';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly _http: HttpClient) { }

  create(signupModel: SignupModel) {
    return this._http.post<any>(`${environment.apiUrl}/api/auth/signup`, signupModel, httpOptions)
  }
}

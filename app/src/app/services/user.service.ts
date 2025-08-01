import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/admin/UserUpdate';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { UserMessage } from '../models/messages/UserMessage';
import { getDownloadURL, ref, Storage, uploadBytesResumable, UploadTaskSnapshot } from '@angular/fire/storage';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly _storage = inject(Storage);

  constructor(
    private readonly _http: HttpClient,
    private readonly _authService: AuthService) { }

  getById(): Observable<User> {
    let id = this._authService.getId();
    if (id == null) {
      return throwError(() => new HttpErrorResponse({
        error: UserMessage.ERROR_404,
        status: 404,
        statusText: 'Not Found'
      }));
    }
    return this._http.get<User>(`${environment.apiUrl}/api/users`);
  }

  update(user: User) {
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

  async uploadImage(file: File): Promise<string> {
    if (!file) {
      throw new Error('Nenhuma imagem inserida para upload');
    }
    const storageRef = ref(this._storage, file.name);
    try {
      const uploadTaskSnapshot: UploadTaskSnapshot = await uploadBytesResumable(storageRef, file);
      const downloadUrl = await getDownloadURL(uploadTaskSnapshot.ref);
      return downloadUrl;
    }
    catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      throw new Error(`Falha no upload da imagem: ${error}`);
    }
  }
}

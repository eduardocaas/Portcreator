import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Certification } from '../models/admin/Certification';
import { environment } from 'src/environments/environment';
import { CertificationMessage } from '../models/messages/CertificationMessage';
import { CertificationPartial } from '../models/admin/CertificationPartial';
import { CertificationSave } from '../models/admin/CertificationSave';
import { getDownloadURL, ref, Storage, uploadBytesResumable, UploadTaskSnapshot } from '@angular/fire/storage';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

const portfolioParam = {
  params: new HttpParams({
    fromString: 'portfolio=true'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CertificationService {

  private readonly _storage = inject(Storage);

  constructor(
    private readonly _http: HttpClient,
  ) { }

  // Overloads
  getAll(portfolio: true): Observable<Certification[]>
  getAll(portfolio: false): Observable<CertificationPartial[]>
  getAll(portfolio: boolean): Observable<CertificationPartial[] | Certification[]> {
    if (portfolio) {
      return this._http.get<Certification[]>(`${environment.apiUrl}/api/certifications`, { params: portfolioParam.params })
    }
    return this._http.get<CertificationPartial[]>(`${environment.apiUrl}/api/certifications`)
  }

  getById(id: string): Observable<Certification> {
    if (id == null) {
      return throwError(() => new HttpErrorResponse({
        error: CertificationMessage.ERROR_404,
        status: 404,
        statusText: 'Not Found'
      }));
    }
    return this._http.get<Certification>(`${environment.apiUrl}/api/certifications/${id}`)
  }

  save(certification: CertificationSave) {
    return this._http.post<void>(`${environment.apiUrl}/api/certifications`, certification, {
      headers: httpOptions.headers,
      observe: 'response',
      responseType: 'json'
    })
  }

  delete(id: string) {
    return this._http.delete<void>(`${environment.apiUrl}/api/certifications/${id}`)
  }

  update(id: string, certification: CertificationSave) {
    return this._http.put<any>(`${environment.apiUrl}/api/certifications/${id}`, certification, {
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

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Certification } from '../models/admin/Certification';
import { environment } from 'src/environments/environment';
import { CertificationMessage } from '../models/messages/CertificationMessage';
import { CertificationPartial } from '../models/admin/CertificationPartial';
import { CertificationSave } from '../models/admin/CertificationSave';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class CertificationService {

  constructor(
    private readonly _http: HttpClient,
  ) { }

  getAll(): Observable<CertificationPartial[]> {
    return this._http.get<CertificationPartial[]>(`${environment}/api/certifications`)
  }

  getById(id: string): Observable<Certification> {
    if (id == null) {
      return throwError(() => new HttpErrorResponse({
        error: CertificationMessage.ERROR_404,
        status: 404,
        statusText: 'Not Found'
      }));
    }
    return this._http.get<Certification>(`${environment}/api/certifications/${id}`,)
  }

  save(certification: CertificationSave) {
    return this._http.post<void>(`${environment}/api/certifications`, certification, {
      headers: httpOptions.headers,
      observe: 'response',
      responseType: 'json'
    })
  }
}

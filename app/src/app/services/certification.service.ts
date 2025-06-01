import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Certification } from '../models/admin/Certification';
import { environment } from 'src/environments/environment';
import { CertificationMessage } from '../models/messages/CertificationMessage';
import { CertificationPartial } from '../models/admin/CertificationPartial';

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
}

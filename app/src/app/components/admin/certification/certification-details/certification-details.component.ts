import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toast } from 'bootstrap';
import { Certification } from 'src/app/models/admin/Certification';
import { CertificationService } from 'src/app/services/certification.service';

@Component({
  selector: 'app-certification-details',
  templateUrl: './certification-details.component.html',
  styleUrl: './certification-details.component.css'
})
export class CertificationDetailsComponent {

  id: string = '';
  certification: Certification | null = null;

  constructor(private readonly _service: CertificationService,
    private readonly _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id')!;
    this.loadCertification();
  }

  loadCertification() {
    this._service.getById(this.id).subscribe({
      next: (res) => {
        this.certification = res;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.showErrorToast();
      }
    });
  }

  showErrorToast() {
    const toastElement = document.getElementById('errorToast');
    if (toastElement) {
      const toast = new Toast(toastElement);
      toast.show();
    }
  }
}

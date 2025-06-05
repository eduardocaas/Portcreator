import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Toast } from 'bootstrap';
import { CertificationPartial } from 'src/app/models/admin/CertificationPartial';
import { CertificationService } from 'src/app/services/certification.service';

@Component({
  selector: 'app-certification-card',
  templateUrl: './certification-card.component.html',
  styleUrl: './certification-card.component.css'
})
export class CertificationCardComponent {

  constructor(
    private readonly _service: CertificationService,
    private readonly _router: Router
  ) { }

  @Input()
  certification!: CertificationPartial;

  delete() {
    this._service.delete(this.certification.id).subscribe({
      next: (res) => {
        const currentUrl = this._router.url;
        this._router.navigate([currentUrl]);
        this.showSuccessToast();

      },
      error: (err: HttpErrorResponse) => {
        this.showErrorToast();
      }
    })
  }

  showSuccessToast() {
    const toastElement = document.getElementById('successToast');
    if (toastElement) {
      const toast = new Toast(toastElement);
      toast.show();
    }
  }

  showErrorToast() {
    const toastElement = document.getElementById('errorToast');
    if (toastElement) {
      const toast = new Toast(toastElement);
      toast.show();
    }
  }
}

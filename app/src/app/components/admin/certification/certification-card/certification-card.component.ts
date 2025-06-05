import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  ) { }

  @Input()
  certification!: CertificationPartial;
  @Output()
  deleted = new EventEmitter<void>();

  delete() {
    this._service.delete(this.certification.id).subscribe({
      next: (res) => {
        this.deleted.emit();
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

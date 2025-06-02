import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Toast } from 'bootstrap';
import { CertificationPartial } from 'src/app/models/admin/CertificationPartial';
import { UserMessage } from 'src/app/models/messages/UserMessage';
import { CertificationService } from 'src/app/services/certification.service';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrl: './certification.component.css'
})
export class CertificationComponent implements OnInit {

  constructor(private readonly _service: CertificationService) { }
  toastMessage: string | null = null;
  certifications: CertificationPartial[] = [];

  ngOnInit(): void {
    this.toastMessage = null;
    this._service.getAll().subscribe({
      next: (res) => {
        this.certifications = res;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.toastMessage = "Falha ao carregar certificações";
        this.showErrorToast();
      },
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

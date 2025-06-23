import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Toast } from 'bootstrap';
import { CertificationPartial } from 'src/app/models/admin/CertificationPartial';
import { CertificationSearch } from 'src/app/models/admin/enums/CertificationSearch';
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
    this.loadData();
  }

  searchText?: string;
  searchOptions = Object.values(CertificationSearch);
  searchOption: CertificationSearch = CertificationSearch.TITLE;

  loadData() {
    this.toastMessage = null;
    this._service.getAll(false).subscribe({
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

  onDelete(status: boolean) {
    if (status == true) {
      this.loadData();
      this.showSuccessToast();
    }
    else {
      this.toastMessage = "Falha ao remover certificação";
      this.showErrorToast();
    }
  }

  showErrorToast() {
    const toastElement = document.getElementById('errorToast');
    if (toastElement) {
      const toast = new Toast(toastElement);
      toast.show();
    }
  }

  showSuccessToast() {
    const toastElement = document.getElementById('successToast');
    if (toastElement) {
      const toast = new Toast(toastElement);
      toast.show();
    }
  }
}

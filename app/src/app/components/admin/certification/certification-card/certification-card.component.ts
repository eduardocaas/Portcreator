import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Modal, Toast } from 'bootstrap';
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
        this.closeModal();
        this.deleted.emit();
      },
      error: (err: HttpErrorResponse) => {
      }
    })
  }

  showModal() {
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modal = Modal.getOrCreateInstance(modalElement);
      modal.show();
    }
  }

  closeModal() {
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modal = Modal.getOrCreateInstance(modalElement);
      modal.hide();
    }
  }
}

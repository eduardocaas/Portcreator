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
  portfolio!: boolean;
  @Input()
  certification!: CertificationPartial;
  @Output()
  deleted = new EventEmitter<boolean>();

  delete() {
    this._service.delete(this.certification.id).subscribe({
      next: (res) => {
        this.closeModal();
        this.deleted.emit(true);
      },
      error: (err: HttpErrorResponse) => {
        this.closeModal();
        this.deleted.emit(false);
      }
    })
  }

  showModal() {
    const modalElement = document.getElementById('deleteModal');
    console.log('certification.imagePath:', this.certification.imagePath);
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

  thumbPath(): string | null {
    if (!this.certification.imagePath) {
      return null;
    }

    const splitPath = this.certification.imagePath.split('/o/');

    if (splitPath.length < 2) {
      return this.certification.imagePath;
    }

    // Adiciona prefixo thumbnail
    const thumbUrl = splitPath[0] + '/o/thumb_' + splitPath[1];

    // Troca extensão do arquivo para .png
    return thumbUrl.replace(/\.[^.?]+(?=\?|$)/, '.png');
  }

  openImage() {
    if (this.certification.imagePath) {
      let splitPath = this.certification.imagePath.split('thumb_');
      let fullPath = splitPath[0] + splitPath[1]
      window.open(fullPath, '_blank');
    }
  }
}

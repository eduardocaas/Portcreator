import { Component } from '@angular/core';
import { Certification } from '../../../../models/admin/Certification';
import { CertificationType } from '../../../../models/admin/enums/CertificationType';
import { CertificationSave } from '../../../../models/admin/CertificationSave';
import { FormControl, FormGroup, ValidationErrors, Validators, AbstractControl } from '@angular/forms';
import { CertificationService } from 'src/app/services/certification.service';
import { Toast } from 'bootstrap';
import { CertificationMessage } from 'src/app/models/messages/CertificationMessage';
import { UserMessage } from 'src/app/models/messages/UserMessage';
@Component({
  selector: 'app-form-certification',
  templateUrl: './form-certification.component.html',
  styleUrl: './form-certification.component.css'
})
export class FormCertificationComponent {

  constructor(private readonly _service: CertificationService) { }

  certificationFormGroup = new FormGroup({
    titleControl: new FormControl('', [Validators.required]),
    descriptionControl: new FormControl('', [Validators.required]),
    issueDateControl: new FormControl('', [Validators.required, this.validDateValidator.bind(this)]),
    hoursControl: new FormControl(null, [Validators.required, Validators.min(1)]),
    institutionControl: new FormControl('', [Validators.required]),
    typeControl: new FormControl(CertificationType.CERTIFICATION, [Validators.required])
  })

  errorMessage: string | null = null;
  certification: CertificationSave | undefined;

  create() {
    this.errorMessage = null;
    if (this.certificationFormGroup.valid) {

      const formValues = this.certificationFormGroup.value;
      this.certification = {
        title: formValues.titleControl!,
        description: formValues.descriptionControl!,
        issueDate: new Date(formValues.issueDateControl! + "T00:00:00"),
        hours: formValues.hoursControl!,
        institutionName: formValues.institutionControl!,
        type: formValues.typeControl! as CertificationType
      };
      this._service.save(this.certification).subscribe({
        next: (res) => {
          this.showSuccessToast();
        },
        error: (err) => {
          if (err.status == 400) {
            this.errorMessage = CertificationMessage.ERROR_400
            this.showErrorToast();
          } else if (err.status == 404) {
            this.errorMessage = UserMessage.ERROR_404
            this.showErrorToast();
          } else {
            this.errorMessage = CertificationMessage.ERROR_500
            this.showErrorToast();
          }
        }
      })
    } else {
      this.errorMessage = "Campos inválidos"
      this.showErrorToast();
    }
  }

  validDateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const date = new Date(value + "T00:00:00");
    const today = new Date();
    const minDate = new Date('1950-01-01');

    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (date < minDate) {
      return { oldDate: true }
    }

    if (date > today) {
      return { futureDate: true }
    }
    return null;
  }

  get titleControl() { return this.certificationFormGroup.get('titleControl') as FormControl; }
  get descriptionControl() { return this.certificationFormGroup.get('descriptionControl') as FormControl; }
  get issueDateControl() { return this.certificationFormGroup.get('issueDateControl') as FormControl; }
  get hoursControl() { return this.certificationFormGroup.get('hoursControl') as FormControl; }
  get institutionControl() { return this.certificationFormGroup.get('institutionControl') as FormControl; }
  get typeControl() { return this.certificationFormGroup.get('typeControl') as FormControl; }

  isInvalid(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  getErrorMessageDate() {
    if (this.issueDateControl.errors?.['required']) {
      return 'Insira uma data de emissão';
    }
    if (this.issueDateControl.errors?.['oldDate']) {
      return 'Insira uma data a partir de 1950';
    }
    if (this.issueDateControl.errors?.['futureDate']) {
      return 'Insira uma data menor ou igual à data de hoje';
    }
    return '';
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

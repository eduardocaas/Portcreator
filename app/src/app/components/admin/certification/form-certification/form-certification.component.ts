import { Component, OnInit } from '@angular/core';
import { Certification } from '../../../../models/admin/Certification';
import { CertificationType } from '../../../../models/admin/enums/CertificationType';
import { CertificationSave } from '../../../../models/admin/CertificationSave';
import { FormControl, FormGroup, ValidationErrors, Validators, AbstractControl } from '@angular/forms';
import { CertificationService } from 'src/app/services/certification.service';
import { Toast } from 'bootstrap';
import { CertificationMessage } from 'src/app/models/messages/CertificationMessage';
import { UserMessage } from 'src/app/models/messages/UserMessage';
import { timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-form-certification',
  templateUrl: './form-certification.component.html',
  styleUrl: './form-certification.component.css'
})
export class FormCertificationComponent implements OnInit {

  constructor(
    private readonly _service: CertificationService,
    private readonly _router: Router,
    private readonly _activeRoute: ActivatedRoute) { }

  idRoute: string | null = null;

  ngOnInit(): void {
    this._activeRoute.paramMap.subscribe(params => {
      this.idRoute = params.get('id');
    })
    this.loadCertification();
  }

  certificationFormGroup = new FormGroup({
    titleControl: new FormControl('', [Validators.required]),
    descriptionControl: new FormControl('', [Validators.required]),
    issueDateControl: new FormControl('', [Validators.required, this.validDateValidator.bind(this)]),
    hoursControl: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    institutionControl: new FormControl('', [Validators.required]),
    typeControl: new FormControl(CertificationType.CERTIFICATION, [Validators.required])
  })

  toastMessage: string | null = null;
  certification: CertificationSave | undefined;

  loadCertification() {
    if (this.idRoute) {
      this._service.getById(this.idRoute).subscribe({
        next: (res) => {
          this.certificationFormGroup.patchValue({
            titleControl: res.title,
            descriptionControl: res.description,
            issueDateControl: res.issueDate ? new Date(res.issueDate).toISOString().substring(0, 10) : '',
            hoursControl: res.hours,
            institutionControl: res.institutionName,
            typeControl: res.type
          })
        },
        error: (err: HttpErrorResponse) => {
          this.toastMessage = CertificationMessage.ERROR_404;
          this.showErrorToast();
          this.idRoute = null;
        }
      })
    }
  }

  update() {
    this.toastMessage = null;
    if (this.certificationFormGroup.valid) {
      const formValues = this.certificationFormGroup.value;
      this.certification = {
        title: formValues.titleControl!,
        description: formValues.descriptionControl!,
        issueDate: new Date(formValues.issueDateControl! + "T00:00:00"),
        hours: formValues.hoursControl!,
        institutionName: formValues.institutionControl!,
        type: formValues.typeControl as CertificationType
      };
      this._service.update(this.idRoute!, this.certification).subscribe({
        next: (res) => {
          this.toastMessage = "Certificação atualizada com sucesso!"
          this.showSuccessToast();
          timer(500).subscribe(x => { this.loadCertification() })
        },
        error: (err) => {
          if (err.status == 400) {
            this.toastMessage = CertificationMessage.ERROR_400
            this.showErrorToast();
          } else if (err.status == 404) {
            this.toastMessage = UserMessage.ERROR_404
            this.showErrorToast();
          } else {
            this.toastMessage = CertificationMessage.ERROR_500
            this.showErrorToast();
          }
        }
      })
    } else {
      this.toastMessage = "Campos inválidos";
      this.showErrorToast();
    }
    // TODO: Criar pipe no details - typeEnum
  }

  create() {
    this.toastMessage = null;
    if (this.certificationFormGroup.valid) {

      const formValues = this.certificationFormGroup.value;
      this.certification = {
        title: formValues.titleControl!,
        description: formValues.descriptionControl!,
        issueDate: new Date(formValues.issueDateControl! + "T00:00:00"),
        hours: formValues.hoursControl!,
        institutionName: formValues.institutionControl!,
        type: formValues.typeControl as CertificationType
      };
      this._service.save(this.certification).subscribe({
        next: (res) => {
          this.toastMessage = "Certificação criada com sucesso!";
          this.showSuccessToast();
          timer(1500).subscribe(x => { this._router.navigate(['/app/certifications']) })
        },
        error: (err) => {
          if (err.status == 400) {
            this.toastMessage = CertificationMessage.ERROR_400
            this.showErrorToast();
          } else if (err.status == 404) {
            this.toastMessage = UserMessage.ERROR_404
            this.showErrorToast();
          } else {
            this.toastMessage = CertificationMessage.ERROR_500
            this.showErrorToast();
          }
        }
      })
    } else {
      this.toastMessage = "Campos inválidos";
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

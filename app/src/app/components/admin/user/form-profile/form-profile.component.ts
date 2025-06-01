import { Component } from '@angular/core';
import { UserUpdate } from '../../../../models/admin/UserUpdate';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserMessage } from 'src/app/models/messages/UserMessage';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.component.html',
  styleUrl: './form-profile.component.css'
})
export class FormProfileComponent {

  constructor(
    private readonly _userService: UserService,
    private readonly _router: Router) { }

  toastMessage: string | null = null;
  updateFormGroup = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    emailControl: new FormControl('', [Validators.required, Validators.email])
  })

  user: UserUpdate = {
    id: '',
    name: '',
    email: '',
    location: '',
    description: '',
    goal: '',
    github: '',
    linkedin: ''
  }

  update() { // TODO: Remover opção de trocar email
    this.toastMessage = null;
    if (true) { // FORMS GROUP
      this._userService.update(this.user).subscribe({
        next: (res) => {
          this.showSuccessToast()
        },
        error: (err: HttpErrorResponse) => {
          if (err.status == 400) {
            this.toastMessage = err.error.message;
            this.showErrorToast();
          }
          else if (err.status == 404) {
            this.toastMessage = UserMessage.ERROR_404;
            this.showErrorToast();
          }
          else {
            this.toastMessage = UserMessage.ERROR_500;
            this.showErrorToast();
          }
        }
      })
    } else {

    }
  }

  showErrorToast(): void {
    const toastElement = document.getElementById('errorToast');
    if (toastElement) {
      const toast = new Toast(toastElement);
      toast.show();
    }
  }

  showSuccessToast(): void {
    const toastElement = document.getElementById('successToast');
    if (toastElement) {
      const toast = new Toast(toastElement);
      toast.show();
    }
  }

  get nameControl() {
    return this.updateFormGroup.get('nameControl') as FormControl;
  }

  get emailControl() {
    return this.updateFormGroup.get('emailControl') as FormControl;
  }

  isNameInvalid(): boolean {
    return this.nameControl.invalid && (this.nameControl.dirty || this.nameControl.touched);
  }

  isEmailInvalid(): boolean {
    return this.emailControl.invalid && (this.emailControl.dirty || this.emailControl.touched);
  }

  getErrorMessageName() {
    return this.nameControl.hasError('required') ? 'Insira um nome' : '';
  }

  getErrorMessageEmail() {
    if (this.emailControl.hasError('required')) {
      return 'Insira um email';
    }
    return this.emailControl.hasError('email') ? 'Insira um email válido' : '';
  }

}

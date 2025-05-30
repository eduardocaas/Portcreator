import { Component } from '@angular/core';
import { SignupModel } from '../../../models/auth/SignupModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Toast } from 'bootstrap';
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { timer } from 'rxjs';
import { AuthMessage } from '../../../models/messages/AuthMessages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  errorMessage: string | null = null;
  signupFormGroup = new FormGroup({
    nameControl: new FormControl('', [Validators.required]),
    emailControl: new FormControl('', [Validators.required, Validators.email]),
    passwordControl: new FormControl('', [Validators.required])
  });

  model: SignupModel = {
    name: '',
    email: '',
    password: ''
  }

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router) { }

  signup() {
    this.errorMessage = null;
    if (this.signupFormGroup.valid) {
      this._authService.signup(this.model).subscribe({
        next: (res) => {
          this.showSuccessToast();
          timer(1500).subscribe(x => { this._router.navigate(['signin']) })
        },
        error: (err: HttpErrorResponse) => {
          if (err.status == 409) {
            this.errorMessage = AuthMessage.SIGNUP_ERROR_409;
            this.showErrorToast();
          }
          else if (err.status == 400) {
            this.errorMessage = AuthMessage.SIGNUP_ERROR_400;
            this.showErrorToast();
          }
          else {
            this.errorMessage = AuthMessage.ERROR_500;
            this.showErrorToast();
          }
        }
      })
    }
    else {
      this.errorMessage = "Campos inválidos";
      this.showErrorToast();
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
    return this.signupFormGroup.get('nameControl') as FormControl;
  }

  get emailControl() {
    return this.signupFormGroup.get('emailControl') as FormControl;
  }

  get passwordControl() {
    return this.signupFormGroup.get('passwordControl') as FormControl;
  }

  isNameInvalid(): boolean {
    return this.nameControl.invalid && (this.nameControl.dirty || this.nameControl.touched);
  }

  isEmailInvalid(): boolean {
    return this.emailControl.invalid && (this.emailControl.dirty || this.emailControl.touched);
  }

  isPasswordInvalid(): boolean {
    return this.passwordControl.invalid && (this.passwordControl.dirty || this.passwordControl.touched);
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

  getErrorMessagePwd() {
    return this.passwordControl.hasError('required') ? 'Insira uma senha' : '';
  }

}

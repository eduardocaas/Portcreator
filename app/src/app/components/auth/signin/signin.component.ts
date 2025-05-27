import { Component, ElementRef, ViewChild } from '@angular/core';
import { Credentials } from '../../../models/auth/Credentials';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Toast } from 'bootstrap';
import { AuthMessage } from '../../../models/messages/AuthMessages';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  errorMessage: string | null = null;
  signinFormGroup = new FormGroup({
    emailControl: new FormControl('', [Validators.required, Validators.email]),
    passwordControl: new FormControl('', [Validators.required])
  });

  credentials: Credentials = {
    email: '',
    password: ''
  }

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router) { }

  signin() {
    this.errorMessage = null;
    if (this.signinFormGroup.valid) {
      this._authService.authenticate(this.credentials).subscribe({
        next: () => {
          timer(500).subscribe(x => { this._router.navigate(['']) });
        },
        error: (err: HttpErrorResponse) => {
          if (err.status == 404) {
            this.errorMessage = AuthMessage.SIGNIN_ERROR_404;
            this.showErrorToast();
          }
          else if (err.status == 400) {
            this.errorMessage = AuthMessage.SIGNIN_ERROR_400;
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

  get emailControl() {
    return this.signinFormGroup.get('emailControl') as FormControl;
  }

  get passwordControl() {
    return this.signinFormGroup.get('passwordControl') as FormControl;
  }

  isEmailInvalid(): boolean {
    return this.emailControl.invalid && (this.emailControl.dirty || this.emailControl.touched);
  }

  isPasswordInvalid(): boolean {
    return this.passwordControl.invalid && (this.passwordControl.dirty || this.passwordControl.touched);
  }

  getErrorMessage() {
    if (this.emailControl.hasError('required')) {
      return 'Insira um email';
    }
    return this.emailControl.hasError('email') ? 'Insira um email válido' : '';
  }

  getErrorMessagePwd() {
    return this.passwordControl.hasError('required') ? 'Insira uma senha' : '';
  }
}

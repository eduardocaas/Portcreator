import { Component } from '@angular/core';
import { SignupModel } from '../../../models/auth/SignupModel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Toast } from 'bootstrap';

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

  }

  showErrorToast(): void {
    const toastElement = document.getElementById('errorToast');
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

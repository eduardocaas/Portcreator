import { Component } from '@angular/core';
import { User } from '../../../../models/admin/UserUpdate';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { UserMessage } from 'src/app/models/messages/UserMessage';
import { Toast } from 'bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.component.html',
  styleUrl: './form-profile.component.css'
})
export class FormProfileComponent {

  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
    private readonly _router: Router) {
      this.getById();
  }

  toastMessage: string | null = null;
  nameControl = new FormControl('', [Validators.required])

  user: User = {
    id: '',
    name: '',
    email: '',
    location: '',
    description: '',
    goal: '',
    github: '',
    linkedin: ''
  }

  getById() {
    this._userService.getById().subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 404) {
          this.toastMessage = UserMessage.ERROR_404;
          this.showErrorToast();
        } else {
          this.toastMessage = UserMessage.ERROR_500;
          this.showErrorToast();
        }
      }
    })
  }

  update() { // TODO: Remover opção de trocar email
    this.user.id = this._authService.getId();
    this.user.email = this._authService.getEmail();
    this.toastMessage = null;
    if (this.nameControl.valid) {
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
      this.toastMessage = "Campos inválidos";
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

  isNameInvalid(): boolean {
    return this.nameControl.invalid && (this.nameControl.dirty || this.nameControl.touched);
  }

  getErrorMessageName() {
    return this.nameControl.hasError('required') ? 'Insira um nome' : '';
  }
}

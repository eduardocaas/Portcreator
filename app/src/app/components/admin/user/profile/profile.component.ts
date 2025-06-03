import { animate, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Toast } from 'bootstrap';
import { User } from 'src/app/models/admin/UserUpdate';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // fade in
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [   // fade out
        animate('200ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ProfileComponent implements OnInit {

  constructor(private readonly _service: UserService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  showEdit: boolean = false;
  user: User | null = null;
  viewUser: User | null = null;

  loadUser() {
    this._service.getById().subscribe({
      next: (res) => {
        this.user = res;
        this.loadViewUser();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.showErrorToast();
      }
    });
  }

  loadViewUser() {
    this.viewUser = { ...this.user! }
  }

  onUpdate() {
    this.loadUser();
    this.showEdit = false;
  }

  toggleEdit() {
    this.showEdit = !this.showEdit;
  }

  showErrorToast() {
    const toastElement = document.getElementById('errorToast');
    if (toastElement) {
      const toast = new Toast(toastElement);
      toast.show();
    }
  }
}

import { Component } from '@angular/core';
import { UserUpdate } from '../../../../models/admin/UserUpdate';

@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.component.html',
  styleUrl: './form-profile.component.css'
})
export class FormProfileComponent {
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
}

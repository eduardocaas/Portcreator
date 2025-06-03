import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/admin/UserUpdate';

@Component({
  selector: 'app-details-profile',
  templateUrl: './details-profile.component.html',
  styleUrl: './details-profile.component.css'
})
export class DetailsProfileComponent {

  @Input()
  user!: User;
}

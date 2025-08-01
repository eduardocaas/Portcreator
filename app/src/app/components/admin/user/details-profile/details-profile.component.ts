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

  thumbPath() {
    if (this.user.imagePath) {
      let splitPath = this.user.imagePath.split('/o/');
      let thumbPath = '/o/thumb_' + splitPath[1];
      return splitPath[0] + thumbPath;
    }
    return null;
  }

  openImage() {
    if (this.user.imagePath) {
      let splitPath = this.user.imagePath.split('thumb_');
      let fullPath = splitPath[0] + splitPath[1]
      window.open(fullPath, '_blank');
    }
  }
}

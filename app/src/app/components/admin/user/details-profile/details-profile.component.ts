import { Component, Input } from '@angular/core';
import { timer } from 'rxjs';
import { User } from 'src/app/models/admin/UserUpdate';

@Component({
  selector: 'app-details-profile',
  templateUrl: './details-profile.component.html',
  styleUrl: './details-profile.component.css'
})
export class DetailsProfileComponent {

  @Input()
  user!: User;

  thumbPath(): string | null {
    if (!this.user.imagePath) {
      return null;
    }

    const splitPath = this.user.imagePath.split('/o/');

    if (splitPath.length < 2) {
      return this.user.imagePath;
    }

    // Adiciona prefixo thumbnail
    const thumbUrl = splitPath[0] + '/o/thumb_' + splitPath[1];

    // Troca extensão do arquivo para .png
    return thumbUrl.replace(/\.[^.?]+(?=\?|$)/, '.png');
  }

  /* openImage() {
  if (this.user.imagePath) {
    let splitPath = this.user.imagePath.split('thumb_');
    let fullPath = splitPath[0] + splitPath[1]
    window.open(fullPath, '_blank');
  }
} */
}


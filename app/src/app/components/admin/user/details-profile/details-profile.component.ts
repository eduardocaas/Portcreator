import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { timer } from 'rxjs';
import { User } from 'src/app/models/admin/UserUpdate';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-details-profile',
  templateUrl: './details-profile.component.html',
  styleUrl: './details-profile.component.css'
})
export class DetailsProfileComponent {

  constructor(private readonly _userService: UserService) {}

  @Input()
  user!: User;

  protected notFoundImage = 'https://firebasestorage.googleapis.com/v0/b/portcreator.firebasestorage.app/o/not_found.jpg?alt=media&token=231902c8-7f16-48a1-97a5-71e489b4e21e';

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

  async removeImage() {
    this.user.imagePath = this.notFoundImage;
    this._userService.update(this.user).subscribe({
      next: (res) => {
        timer(1000).subscribe(x => { alert('Imagem removida com sucesso!') })
      },
      error: (err: HttpErrorResponse) => {
       alert('Falha ao remover imagem, tente novamente mais tarde.')
      }
    })
  }

  /* openImage() {
  if (this.user.imagePath) {
    let splitPath = this.user.imagePath.split('thumb_');
    let fullPath = splitPath[0] + splitPath[1]
    window.open(fullPath, '_blank');
  }
} */
}


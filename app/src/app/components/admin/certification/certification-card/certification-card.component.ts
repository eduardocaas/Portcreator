import { Component, Input } from '@angular/core';
import { CertificationPartial } from 'src/app/models/admin/CertificationPartial';

@Component({
  selector: 'app-certification-card',
  templateUrl: './certification-card.component.html',
  styleUrl: './certification-card.component.css'
})
export class CertificationCardComponent {
  @Input()
  certification!: CertificationPartial;
}

import { Pipe, PipeTransform } from '@angular/core';
import { CertificationType } from '../models/admin/enums/CertificationType';

@Pipe({
  name: 'type'
})
export class TypePipe implements PipeTransform {

  transform(value: CertificationType): string {
    switch (value) {
      case CertificationType.CERTIFICATION:
        return 'Certificação';
      case CertificationType.COURSE:
        return 'Curso';
      default:
        return 'Inválido';
    }
 }
}

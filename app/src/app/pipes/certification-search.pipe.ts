import { Pipe, PipeTransform } from '@angular/core';
import { CertificationPartial } from '../models/admin/CertificationPartial';
import { CertificationSearch } from '../models/admin/enums/CertificationSearch';

@Pipe({
  name: 'certificationSearch'
})
export class CertificationSearchPipe implements PipeTransform {

  transform(certifications: CertificationPartial[], searchText: string | undefined, searchType: CertificationSearch): CertificationPartial[] {
    if (!searchText || searchText.length < 3) {
      return certifications;
    }

    if (searchType == CertificationSearch.TITLE) {
      return certifications.filter((certification) => {
        return certification.title.toLowerCase().includes(searchText.toLowerCase());
      }); // TODO: Adicionar mais opções
    } else {
      return certifications;
    }
  }
}

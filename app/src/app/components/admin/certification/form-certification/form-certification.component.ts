import { Component } from '@angular/core';
import { Certification } from '../../../../models/admin/Certification';
import { CertificationType } from '../../../../models/admin/enums/CertificationType';
import { CertificationSave } from '../../../../models/admin/CertificationSave';
@Component({
  selector: 'app-form-certification',
  templateUrl: './form-certification.component.html',
  styleUrl: './form-certification.component.css'
})
export class FormCertificationComponent {

  certification: CertificationSave = {
    title: '',
    description: '',
    type: CertificationType.CERTIFICATION,
    issueDate: new Date(),
    hours: 0,
    institutionName: '',
  }
}

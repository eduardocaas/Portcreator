import { CertificationType } from "../../enums/CertificationType";

export class CertificationSaveInputModel {
  title: string;
  description: string;
  type: CertificationType;
  issueDate: Date;
  hours: number;
  institutionName: string;

  constructor(
    title: string,
    description: string,
    type: CertificationType,
    issueDate: Date,
    hours: number,
    institutionName: string,) {
    this.title = title;
    this.description = description;
    this.type = type;
    this.issueDate = issueDate;
    this.hours = hours;
    this.institutionName = institutionName;
  }
}
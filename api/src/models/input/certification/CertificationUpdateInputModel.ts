import { CertificationType } from "../../enums/CertificationType";

export class CertificationUpdateInputModel {
  id: string;
  title: string;
  description: string;
  type: CertificationType;
  issueDate: Date;
  hours: number;
  institutionName: string;

  constructor(
    id: string,
    title: string,
    description: string,
    type: CertificationType,
    issueDate: Date,
    hours: number,
    institutionName: string,) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.type = type;
    this.issueDate = issueDate;
    this.hours = hours;
    this.institutionName = institutionName;
  }
}
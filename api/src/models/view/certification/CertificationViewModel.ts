import { CertificationType } from "../../enums/CertificationType";

export class CertificationViewModel {

  id: string;
  title: string;
  description: string;
  type: CertificationType;
  issueDate: Date;
  hours: number;
  institutionName: string;
  imagePath?: string;

  constructor(
    id: string,
    title: string,
    description: string,
    type: CertificationType,
    issueDate: Date,
    hours: number,
    institutionName: string,
    imagePath?: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.type = type;
    this.issueDate = issueDate;
    this.hours = hours;
    this.institutionName = institutionName;
    this.imagePath = imagePath;
  }
}
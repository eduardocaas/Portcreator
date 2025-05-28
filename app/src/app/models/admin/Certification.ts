import { CertificationType } from "./enums/CertificationType";

export interface Certification {
  id: string,
  title: string,
  description: string,
  type: CertificationType,
  issueDate: Date,
  hours: number,
  institutionName: string;
  imagePath: string;
}

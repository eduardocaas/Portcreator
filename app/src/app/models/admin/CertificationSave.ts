import { CertificationType } from "./enums/CertificationType";

export interface CertificationSave {
    title: string,
    description: string,
    type: CertificationType,
    issueDate: Date,
    hours: number,
    institutionName: string;
}

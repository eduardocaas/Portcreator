import { Certification } from "../admin/Certification";

export interface PortfolioPOJO {
  id: string;
  name: string;
  email: string;
  location: string;
  description: string;
  goal: string;
  github: string;
  linkedin: string;
  certifications: Certification[];
}

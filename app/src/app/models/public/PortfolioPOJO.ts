import { Certification } from "../admin/Certification";

export interface PortfolioPOJO {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  location?: string | null;
  description?: string | null;
  goal?: string | null;
  github?: string | null;
  linkedin?: string | null;
  imagePath?: string | null;
  certifications?: Certification[] | null;
  status?: boolean | null;
}

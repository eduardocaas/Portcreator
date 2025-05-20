import { Certification } from "../../models/Certification";

export interface ICertificationService {
  save(certification: Certification): Promise<Certification>;
}
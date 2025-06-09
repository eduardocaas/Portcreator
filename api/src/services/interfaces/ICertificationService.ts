import { Certification } from "../../models/Certification";
import { CertificationUpdateInputModel } from "../../models/input/certification/CertificationUpdateInputModel";
import { User } from "../../models/User";

export interface ICertificationService {
  save(certification: Certification): Promise<Certification>;
  getAll(user: User): Promise<Certification[]>;
  getById(id: string): Promise<Certification | null>;
  delete(id: string): Promise<void>
  update(id: string, inputModel: CertificationUpdateInputModel): Promise<boolean>;
}
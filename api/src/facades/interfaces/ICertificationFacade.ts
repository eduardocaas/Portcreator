import { CertificationSaveInputModel } from "../../models/input/certification/CertificationSaveInputModel";
import { CertificationUpdateInputModel } from "../../models/input/certification/CertificationUpdateInputModel";
import { CertificationPartialViewModel } from "../../models/view/certification/CertificationPartialViewModel";
import { CertificationViewModel } from "../../models/view/certification/CertificationViewModel";

export interface ICertificationFacade {
  save(token: string | undefined, input: CertificationSaveInputModel): Promise<CertificationPartialViewModel>;
  getAllByUser(token: string | undefined):  Promise<CertificationPartialViewModel[]>;
  getById(id: string): Promise<CertificationViewModel>;
  delete(id: string): Promise<void>;
  update(id: string, input: CertificationUpdateInputModel): Promise<boolean>;
}
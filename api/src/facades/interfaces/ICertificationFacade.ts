import { CertificationSaveInputModel } from "../../models/input/certification/CertificationSaveInputModel";
import { CertificationPartialViewModel } from "../../models/view/certification/CertificationPartialViewModel";
import { CertificationViewModel } from "../../models/view/certification/CertificationViewModel";

export interface ICertificationFacade {
  save(token: string | undefined, input: CertificationSaveInputModel): Promise<CertificationPartialViewModel>;
  getAllByUser(token: string | undefined):  Promise<CertificationPartialViewModel[]>;
  getById(id: string): Promise<CertificationViewModel>;
}
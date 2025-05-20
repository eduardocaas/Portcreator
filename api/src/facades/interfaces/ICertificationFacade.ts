import { CertificationSaveInputModel } from "../../models/input/certification/CertificationSaveInputModel";
import { CertificationPartialViewModel } from "../../models/view/certification/CertificationPartialViewModel";

export interface ICertificationFacade {
  save(token: string | undefined, input: CertificationSaveInputModel): Promise<CertificationPartialViewModel>
}
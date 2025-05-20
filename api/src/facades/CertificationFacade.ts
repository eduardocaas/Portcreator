import { CertificationSaveInputModel } from "../models/input/certification/CertificationSaveInputModel";
import { CertificationPartialViewModel } from "../models/view/certification/CertificationPartialViewModel";
import { ICertificationFacade } from "./interfaces/ICertificationFacade";

export class CertificationFacade implements ICertificationFacade {
  
  save(token: string | undefined, input: CertificationSaveInputModel): Promise<CertificationPartialViewModel> {
    throw new Error("Method not implemented.");
  }
}
import { Certification } from "../models/Certification";
import { CertificationSaveInputModel } from "../models/input/certification/CertificationSaveInputModel";
import { CertificationPartialViewModel } from "../models/view/certification/CertificationPartialViewModel";
import { IAuthService } from "../services/interfaces/IAuthService";
import { ICertificationService } from "../services/interfaces/ICertificationService";
import { IUserService } from "../services/interfaces/IUserService";
import { ICertificationFacade } from "./interfaces/ICertificationFacade";

export class CertificationFacade implements ICertificationFacade {
  private readonly _certificationService: ICertificationService;
  private readonly _authService: IAuthService;
  private readonly _userService: IUserService;

  constructor(
    certificationService:
      ICertificationService,
    authService: IAuthService,
    userService: IUserService) {
    this._certificationService = certificationService;
    this._authService = authService;
    this._userService = userService;
  }

  async save(token: string | undefined, input: CertificationSaveInputModel): Promise<CertificationPartialViewModel> {
    if (!input?.title || !input?.description || input?.type === undefined || !input?.issueDate || !input?.hours|| !input?.institutionName ) {
      throw ({ id: 400, msg: "Campos obrigatórios: Título, descrição, tipo, data de emissão, horas, nome da instituição" });
    }

    let id = this._authService.getIdByToken(token!);
    if (!id || id == undefined) {
      throw ({ id: 400, msg: "Token inválido" });
    }

    let user = await this._userService.getById(id);
    let certification = new Certification(
      input.title,
      input.description,
      input.type,
      input.issueDate,
      input.hours,
      input.institutionName,
      user);

    let certificationCreated = await this._certificationService.save(certification);

    return new CertificationPartialViewModel(certificationCreated.id, certificationCreated.title);
  }
}
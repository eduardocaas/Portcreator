import { Certification } from "../models/Certification";
import { CertificationSaveInputModel } from "../models/input/certification/CertificationSaveInputModel";
import { CertificationUpdateInputModel } from "../models/input/certification/CertificationUpdateInputModel";
import { CertificationPartialViewModel } from "../models/view/certification/CertificationPartialViewModel";
import { CertificationViewModel } from "../models/view/certification/CertificationViewModel";
import { IAuthService } from "../services/interfaces/IAuthService";
import { ICertificationService } from "../services/interfaces/ICertificationService";
import { IUserService } from "../services/interfaces/IUserService";
import { ICertificationFacade } from "./interfaces/ICertificationFacade";
import * as validator from 'validator';

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
    if (!input?.title || !input?.description || input?.type === undefined || !input?.issueDate || !input?.hours || !input?.institutionName) {
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

    return new CertificationPartialViewModel(certificationCreated.id, certificationCreated.title, certificationCreated.hours);
  }

  async getAllByUser(token: string | undefined, portfolio: boolean): Promise<CertificationPartialViewModel[] | CertificationViewModel[]> {
    let id = this._authService.getIdByToken(token!);
    if (!id || id == undefined) {
      throw ({ id: 400, msg: "Token inválido" });
    }

    let user = await this._userService.getById(id);
    let certifications = await this._certificationService.getAll(user);

    if (portfolio) {
      let certificationsViewModel: CertificationViewModel[] = certifications.map(cert => ({
        id: cert.id,
        title: cert.title,
        description: cert.description,
        type: cert.type,
        issueDate: cert.issueDate,
        hours: cert.hours,
        institutionName: cert.institutionName,
        imagePath: cert.imagePath
      }));
      return certificationsViewModel;
    }
    let certificationsViewModel: CertificationPartialViewModel[] = certifications.map(cert => ({
      id: cert.id,
      title: cert.title,
      hours: cert.hours,
      imagePath: cert.imagePath
    }));
    return certificationsViewModel;
  }

  async getById(id: string): Promise<CertificationViewModel> {
    if (!id || id == undefined) {
      throw ({ id: 400, msg: "Id inválido" });
    }

    let certification = await this._certificationService.getById(id);
    if (!certification || certification == null) {
      throw ({ id: 400, msg: "Certificação não encontrada" });
    }

    return new CertificationViewModel(
      certification.id,
      certification.title,
      certification.description,
      certification.type,
      certification.issueDate,
      certification.hours,
      certification.institutionName,
      certification.imagePath);
  }

  async delete(id: string): Promise<void> {
    if (!id || id == undefined) {
      throw ({ id: 400, msg: "Id inválido" });
    }
    await this._certificationService.delete(id);
  }

  async update(id: string, input: CertificationUpdateInputModel): Promise<boolean> {
    if (!id || !validator.isUUID(id!)) {
      throw ({ id: 400, msg: "Id inválido" });
    }

    if (!input?.title || !input?.description || input?.type === undefined || !input?.issueDate || !input?.hours || !input?.institutionName) {
      throw ({ id: 400, msg: "Campos obrigatórios: Título, descrição, tipo, data de emissão, horas, nome da instituição" });
    }

    let res = await this._certificationService.update(id, input);
    return res
  }

}
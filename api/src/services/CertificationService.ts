import { Repository } from "typeorm";
import { Certification } from "../models/Certification";
import { ICertificationService } from "./interfaces/ICertificationService";

export class CertificationService implements ICertificationService {
  private _repository: Repository<Certification>;

  constructor(repository: Repository<Certification>) {
    this._repository = repository;
  }

  async save(certification: Certification): Promise<Certification> {
    try {
      let certificationSave = await this._repository.save(certification);
      return certificationSave;
    }
    catch (err) {
      throw ({ id: 500, msg: err })
    }
  }
}
import { Repository } from "typeorm";
import { Certification } from "../models/Certification";
import { ICertificationService } from "./interfaces/ICertificationService";
import { User } from "../models/User";
import * as validator from 'validator';

export class CertificationService implements ICertificationService {
  private _repository: Repository<Certification>;

  constructor(repository: Repository<Certification>) {
    this._repository = repository;
  }

  async save(certification: Certification): Promise<Certification> {
    try {
      let certificationCreated = await this._repository.save(certification);
      return certificationCreated;
    }
    catch (err) {
      throw ({ id: 500, msg: err })
    }
  }

  async getAll(user: User): Promise<Certification[]> {
    try {
      let certifications = await this._repository.find({
        where: { user: { id: user.id } },
        relations: []
      });
      return certifications;
    }
    catch (err) {
      throw ({ id: 500, msg: err })
    }
  }

  async getById(id: string): Promise<Certification | null> {
    try {
      if (!validator.isUUID(id!)) {
        throw ({ id: 400, msg: "Id inválido" });
      }

      let certification = await this._repository.findOne({
        where: { id: id },
        relations: []
      });
      return certification;
    }
    catch (err) {
      throw ({ id: 500, msg: err })
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this._repository.delete({
        id: id
      })
    }
    catch (err) {
      throw ({ id: 500, msg: err })
    }
  }

}
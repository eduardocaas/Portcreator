import { Repository } from "typeorm";
import { Certification } from "../models/Certification";

export class CertificationService {
  private _repository: Repository<Certification>;

  constructor(repository: Repository<Certification>) {
    this._repository = repository;
  }
}
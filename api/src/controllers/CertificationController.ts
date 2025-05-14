import { Repository } from "typeorm";
import { Certification } from "../models/Certification";

export class CertificationController {
  private _repository: Repository<Certification>;

  constructor(repository: Repository<Certification>) {
    this._repository = repository;
  }
}
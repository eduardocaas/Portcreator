import { CertificationService } from "../services/CertificationService";

export class CertificationController {
    private _service: CertificationService;
  
    constructor(service: CertificationService) {
      this._service = service;
    }
}
import { Request, Response } from "express";
import { ICertificationFacade } from "../facades/interfaces/ICertificationFacade";
import { CertificationSaveInputModel } from "../models/input/certification/CertificationSaveInputModel";

export class CertificationController {
  private readonly _certificationFacade: ICertificationFacade;

  constructor(certificationFacade: ICertificationFacade) {
    this._certificationFacade = certificationFacade;
  }

  save = async (req: Request, res: Response): Promise<void> => {
    const input: CertificationSaveInputModel = req.body;
    try {
      const token = req.get("Token");
      let certificationViewModel = await this._certificationFacade.save(token, input);
      res.status(200).json({ certificationViewModel });
    } catch (err: any) {
      if (err.id) {
        res.status(err.id).json({ message: err.msg });
      }
      else {
        res.status(500).json({ message: err });
      }
    }
  }
}
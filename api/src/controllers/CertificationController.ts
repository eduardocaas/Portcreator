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
      res.status(200).json(certificationViewModel);
    } catch (err: any) {
      if (err.id) {
        res.status(err.id).json({ message: err.msg });
      }
      else {
        res.status(500).json({ message: err });
      }
    }
  }

  getAllByUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.get("Token");
      let certificationsViewModel = await this._certificationFacade.getAllByUser(token);
      res.status(200).json(certificationsViewModel);
    } catch (err: any) {
      if (err.id) {
        res.status(err.id).json({ message: err.msg });
      }
      else {
        res.status(500).json({ message: err });
      }
    }
  }

  getById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
      let certificationViewModel = await this._certificationFacade.getById(id);
      res.status(200).json(certificationViewModel);
    }
    catch (err: any) {
      if (err.id) {
        res.status(err.id).json({ message: err.msg });
      }
      else {
        res.status(500).json({ message: err });
      }
    }
  }

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
      await this._certificationFacade.delete(id);
      res.status(204).send();
    }
    catch (err: any) {
      if (err.id) {
        res.status(err.id).json({ message: err.msg });
      }
      else {
        res.status(500).json({ message: err });
      }
    }
  }
}
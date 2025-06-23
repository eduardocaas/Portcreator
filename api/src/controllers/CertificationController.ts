import { Request, Response } from "express";
import { ICertificationFacade } from "../facades/interfaces/ICertificationFacade";
import { CertificationSaveInputModel } from "../models/input/certification/CertificationSaveInputModel";
import { CertificationUpdateInputModel } from "../models/input/certification/CertificationUpdateInputModel";
import { CertificationPartialViewModel } from "../models/view/certification/CertificationPartialViewModel";
import { CertificationViewModel } from "../models/view/certification/CertificationViewModel";

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
      const portfolio = req.query.portfolio;
      const token = req.get("Token");

      let certificationsViewModel: CertificationPartialViewModel[] | CertificationViewModel[] = [];
      if (portfolio) {
        certificationsViewModel = await this._certificationFacade.getAllByUser(token, true);
      } else {
        certificationsViewModel = await this._certificationFacade.getAllByUser(token, false);
      }
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

  update = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const input: CertificationUpdateInputModel = req.body;
    try {
      const result = await this._certificationFacade.update(id, input);
      if (result) {
        res.status(200).json({ message: "Certificação atualizada com sucesso" });
      }
      else {
        res.status(500).json({ message: "Falha ao atualizar certificação" });
      }
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
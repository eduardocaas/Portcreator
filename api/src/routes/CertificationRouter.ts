import { Router } from "express";
import { CertificationController } from "../controllers/CertificationController";

export const certificationRoutes = (controller: CertificationController): Router => {
  const router = Router();

  return router;
}
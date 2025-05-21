import { Router } from "express";
import { CertificationController } from "../controllers/CertificationController";

export const certificationRoutes = (controller: CertificationController): Router => {
  const router = Router();

  router.post('/', controller.save);  

  return router;
}
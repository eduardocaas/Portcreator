import { Router } from "express";
import { CertificationController } from "../controllers/CertificationController";

export const certificationRoutes = (controller: CertificationController): Router => {
  const router = Router();

  router.post('/', controller.save);
  router.get('/', controller.getAllByUser);
  router.get('/:id', controller.getById);
  router.delete('/:id', controller.delete);
  router.put('/:id', controller.update);

  return router;
}
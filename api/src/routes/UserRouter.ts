import { Router } from "express";
import { UserController } from "../controllers/UserController";

export const userRoutes = (controller: UserController) => {
  const router = Router();

  router.get('/', controller.getById)
  router.put('/:id', controller.update);
  router.delete('/', controller.delete);

  return router;
}
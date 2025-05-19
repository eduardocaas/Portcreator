import { Router } from "express";
import { UserController } from "../controllers/UserController";

export const userRoutes = (controller: UserController) => {
  const router = Router();

  router.put('/update/:id', controller.update);

  return router;
}
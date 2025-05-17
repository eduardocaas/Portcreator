import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

export const authRoutes = (controller: AuthController) => {
  const router = Router();

  router.post('/signup', controller.signUp);
  router.post('/signin', controller.signIn);
  
  return router;
}
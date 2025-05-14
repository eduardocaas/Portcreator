import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

export const authRoutes = (controller: AuthController) => {
  const router = Router();

  return router;
}
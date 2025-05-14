import { Router } from "express";
import { UserController } from "../controllers/UserController";

export const userRoutes = (controller: UserController) => {
  const router = Router();

  return router;
}
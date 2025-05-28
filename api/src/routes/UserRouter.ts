import { Router } from "express";
import { UserController } from "../controllers/UserController";
import multer from "multer";

export const userRoutes = (controller: UserController) => {
  const router = Router();
  const upload = multer({ dest: './images/user' });

  router.get('/', controller.getById)
  router.put('/:id', controller.update);
  router.delete('/', controller.delete);
  router.post(
    '/image',
    upload.single('profileImage'),
    controller.image
  );

  return router;
}
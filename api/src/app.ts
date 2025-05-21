import { AppDataSource } from "./data-source";
import express from 'express';
import "dotenv/config"
import { User } from "./models/User";
import { UserService } from "./services/UserService";
import { UserController } from "./controllers/UserController";
import { AuthService } from "./services/AuthService";
import { AuthFacade } from "./facades/AuthFacade";
import { AuthController } from "./controllers/AuthController";
import { Certification } from "./models/Certification";
import { CertificationService } from "./services/CertificationService";
import { CertificationController } from "./controllers/CertificationController";
import { userRoutes } from "./routes/UserRouter";
import { authRoutes } from "./routes/AuthRouter";
import { certificationRoutes } from "./routes/CertificationRouter";
import { TokenMiddleware } from "./middlewares/TokenMiddleware";
import { UserFacade } from "./facades/UserFacade";
import { CertificationFacade } from "./facades/CertificationFacade";

AppDataSource.initialize().then(async => {
  const app = express();
  app.use(express.json())

  // User 1
  const userRepository = AppDataSource.getRepository(User);
  const userService = new UserService(userRepository);

  // Auth
  const authService = new AuthService(userRepository);
  const authFacade = new AuthFacade(authService, userService);
  const authController = new AuthController(authFacade);

  // User 2
  const userFacade = new UserFacade(authService, userService);
  const userController = new UserController(userService, userFacade);

  // Certification
  const certificationRepository = AppDataSource.getRepository(Certification);
  const certificationService = new CertificationService(certificationRepository);
  const certificationFacade = new CertificationFacade(certificationService, authService, userService);
  const certificationController = new CertificationController(certificationFacade);

  // Middlewares
  const tokenMiddleware = new TokenMiddleware(authService);

  // Routes
  app.use('/api/auth', authRoutes(authController));

  app.use(tokenMiddleware.verifyAccess.bind(tokenMiddleware));

  app.use('/api/users', userRoutes(userController));
  app.use('/api/certifications', certificationRoutes(certificationController));

  const PORT = process.env.APP_PORT;
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  })
});
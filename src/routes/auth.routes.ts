import { Router } from 'express';
import AuthController from 'src/controllers/AuthController';
import { validateLogin, validateCreateUser } from 'src/middlewares/validate.middleware';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/register', validateCreateUser, AuthController.signup);
    this.router.post('/login', validateLogin, AuthController.signin);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default new AuthRoutes().getRouter();

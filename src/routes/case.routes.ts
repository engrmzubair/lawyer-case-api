import { Router } from 'express';
import CaseController from 'src/controllers/CaseController';
import { authenticate } from 'src/middlewares/auth.middleware';
import { validateCreateCase } from 'src/middlewares/validate.middleware';

class CaseRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', authenticate, validateCreateCase, CaseController.createCase);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default new CaseRoutes().getRouter();

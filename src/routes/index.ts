import { Router } from 'express';
import authRoutes from './auth.routes';
import caseRoutes from './case.routes';

class AppRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use('/auth', authRoutes);
    this.router.use('/cases', caseRoutes);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default new AppRoutes().getRouter();

// src/app.ts

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.configureMiddleware();
        this.configureRoutes();
        this.configureErrorHandling();
    }

    private configureMiddleware(): void {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(morgan('combined'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private configureRoutes(): void {
        this.app.use('/api/v1', routes);
    }

    private configureErrorHandling(): void {
        this.app.use(notFoundHandler);
        this.app.use(errorHandler);
    }
}

export default new App().app;

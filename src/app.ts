import express from 'express'
import type { Request, Response, NextFunction, Express } from 'express';
import authRouter from './modules/auth/auth.route.js'
import { authenticate, authorize } from './middlewares/auth.js';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.text());

app.use('/api/auth', authRouter);

app.use(authenticate);
app.use(authorize("maintainer"));

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: "Hello World",
    })
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        success: false,
        message: error.message,
        error,
    })
})

export default app;
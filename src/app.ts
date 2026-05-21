import express from 'express'
import type { Request, Response, NextFunction, Express } from 'express';
import authRouter from './modules/auth/auth.route.js'

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.text());

app.use('/api/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: "Hello World",
    })
})

export default app;
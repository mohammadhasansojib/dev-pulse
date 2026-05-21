import express from 'express'
import type { Request, Response, NextFunction, Express } from 'express';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.text());

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: "Hello World",
    })
})

export default app;
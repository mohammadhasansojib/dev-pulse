import type { Request, Response, NextFunction } from "express"
import jwt, { type JwtPayload } from 'jsonwebtoken'
import config from "../config/index.js";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req?.headers?.authorization;
        if (!token) {
            res.status(401).json({
                success: false,
                message: "token not found",
                errors: {},
            })
        }
        
        const decoded = jwt.verify(
            token as string,
            config.jwt_secret as string
        );
        req.user = decoded as JwtPayload;

        next();

    } catch (error: any) {
        next(error);
    }
}

export const authorize = (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
        try {
            const {role} = req.user as JwtPayload;
            if (!roles.includes(role)) {
                res.status(403).json({
                    success: false,
                    message: "Unauthorized access",
                    errors: {},
                })
            }

            next();
        } catch (error: any) {
            next(error);
        }
    }


export default {
    authenticate,
    authorize,
}
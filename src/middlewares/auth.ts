import type { Request, Response, NextFunction } from "express"
import jwt, { type JwtPayload } from 'jsonwebtoken'
import config from "../config/index.js";
import isOwnOpenIssue from "../utils/isOwnOpenIssue.js";

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

export const authorize = (...roles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
        try {

            const method = req.method;
            const issue_id = Number(req.params.id);

            if (method === "PATCH" && req.user?.role === "contributor") {
                let isValidUser = await isOwnOpenIssue(issue_id, req.user?.id);

                if (isValidUser) {
                    return next();
                }
            }


            const {role} = req.user as JwtPayload;
            if (!roles.includes(role)) {
                return res.status(403).json({
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
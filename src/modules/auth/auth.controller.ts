import type { Request, Response } from "express";
import authService, { getAccessToken, getUserByEmail, matchUserPassword } from "./auth.service.js";
import { successResponse, errorResponse } from "../../utils/response.js";
import { removePasswordFromUser } from "../../utils/removePassword.js";


const userSignup = async (req: Request, res: Response) => {
    try {
        const {name, email, password, role} = req.body;

        const user = await authService.createUserIntoDB({name, email, password, role});

        return res.status(201).json(successResponse(user, "User registered successfully"));

    } catch (error: any) {
        console.log(error);
        res.status(500).json(errorResponse(error));
    }
}

const userLogin = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        const user = await getUserByEmail(email);
        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "user not found",
                data: {},
            })
        }

        const matchPassword = await matchUserPassword(password, user[0].password);
        if (!matchPassword) return res.status(401).json({
            success: false,
            message: "invalid credentials",
            data: {},
        })

        const userWithoutPassword = removePasswordFromUser(user[0]);

        const accessToken = getAccessToken({
            id: user[0].id,
            name: user[0].name,
            role: user[0].role,
        });

        return res.json({
            success: true,
            message: "Login successful",
            data: {
                token: accessToken,
                user: userWithoutPassword,
            }
        });

    } catch (error: any) {
        res.status(500).json(errorResponse(error));
    }
}

export default {
    userSignup,
    userLogin,
}
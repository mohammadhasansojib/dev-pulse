import type { AccessTokenPayload, IUser, signupPayload } from "./auth.interface.js";
import { pool } from "../../database/index.js";
import bcrypt from 'bcrypt'
import { removePasswordFromUser } from "../../utils/removePassword.js";
import jwt from 'jsonwebtoken'
import config from "../../config/index.js";


export const createUserIntoDB = async (payload: signupPayload) => {
    try {
        const {name, email, password, role} = payload;

        const hash_password = await bcrypt.hash(password, 10);
        const nonNullRole = role === 'contributor' || role === 'maintainer' ? role : "contributor";
        
        const response = await pool.query(
            `
            INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4::user_role) RETURNING *;
            `
        , [name, email, hash_password, nonNullRole]);
        const user = response.rows[0];

        const userWithoutPassword = removePasswordFromUser(user);

        return userWithoutPassword;

    } catch (error: any) {
        throw new Error(error);
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const response = await pool.query(
            `
            SELECT * FROM users WHERE email = $1;
            `
        , [email]);

        if (response.rowCount === 0) {
            return [];
        }

        const user = response.rows;
        return user;

    } catch (error: any) {
        throw new Error(error);
    }
}

export const matchUserPassword = async (password: string, hash_password: string): Promise<boolean> => {
    try {
        
        const isMatchPassword = await bcrypt.compare(password, hash_password);
        if (!isMatchPassword) return false;

        return true;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getAccessToken = (payload: AccessTokenPayload) => {
    try {
        
        const accessToken = jwt.sign(
            payload,
            config.jwt_secret as string,
            {
                expiresIn: '1d',
            }
        );

        return accessToken;

    } catch (error: any) {
        throw new Error(error);
    }
}


export default {
    createUserIntoDB,
    getUserByEmail,
    matchUserPassword,
    getAccessToken,
}
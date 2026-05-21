import type { IUser } from "../modules/auth/auth.interface.js";


export const removePasswordFromUser = (user: IUser): Omit<IUser, "password"> => {
    const userWithoutPassword: any = {
        ...user,
    };
    delete userWithoutPassword.password;

    return userWithoutPassword as Omit<IUser, "password">;
}
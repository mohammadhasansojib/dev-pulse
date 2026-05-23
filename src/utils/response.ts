import type { SuccessDataType } from "../modules/auth/auth.interface.js"


export const successResponse = (data: SuccessDataType, message: string) => {
    return {
        success: true,
        message,
        data,
    }
}

export const errorResponse = (errors: any) => {
    return {
        success: false,
        message: errors.message,
        errors,
    }
}

// export const loginResponse = (user: IUser, token: string) => {
//     const userWithoutPassword: Partial<IUser> = {
//         ...user,
//     };
//     delete userWithoutPassword.password;

//     return {
//         success: true,
//         message: "Login successful",
//         data: {
//             token,
//             user: userWithoutPassword,
//         }
//     }
// }
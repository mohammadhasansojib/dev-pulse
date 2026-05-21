

export interface signupPayload {
    name: string,
    email: string,
    password: string,
    role: "contributor" | "maintainer"
}

export interface loginPayload {
    email: string,
    password: string,
}

export interface IUser extends signupPayload {
    id: number,
    created_at: Date,
    updated_at: Date,
}

export type AccessTokenPayload = Omit<IUser, "email" | "password" | "created_at" | "updated_at">;

export type SuccessDataType = Omit<IUser, "password"> | Omit<IUser, "password">[];
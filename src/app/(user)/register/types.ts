export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    telephone: string;
}
export interface findUser {
    ok: boolean;
    user?: {
        createdAt: string;
        email: string;
        name: string;
        updatedAt: string;
        _id: string;
        isVerified?: boolean;
    };
    msg?: string;
    token?: string;
}
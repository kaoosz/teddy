

export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: Date;
}

export interface User {
    id: number;
    email: string;
    password: string;
}

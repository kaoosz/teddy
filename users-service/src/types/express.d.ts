


declare namespace Express {
    interface Request {
        user?:{
            id: number;
            email: string;
            [key: string]: any;
        } | null;
    }
}
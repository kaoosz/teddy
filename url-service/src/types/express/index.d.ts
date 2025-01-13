declare namespace Express{
    interface Request {
        user?: {
            id:number;
            name: string;
            email: string;
            created_at: string;
            updated_at: string;
        } | null ; 
    }
}

// declare namespace Express {
//     interface Request {
//         user?:{
//             id: number;
//             email: string;
//             [key: string]: any;
//         } | null;
//     }
// }
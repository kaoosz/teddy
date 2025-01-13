import { Request,Response,NextFunction } from "express";
import { STATUS } from "../utils/statusCode";

export const authenticateOptional = (required: boolean = false) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            if (required) {
                res.status(STATUS.UNAUTHORIZED).json({ message: "Authentication requireds" });
            }
            req.user = null;
            next();
            return;
        }

        const token = authHeader.split(" ")[1];

        try {
            console.log(process.env.AUTH_URL);
            const validation = await fetch(`${process.env.AUTH_URL}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const data = await validation.json();
        
            if (!data.valid) {
                res.status(STATUS.UNAUTHORIZED).json({ message: "Invalid tokens" });
                return;
            }

            req.user = data.user;
            next();
        } catch (error) {
            if (required) {
                res.status(STATUS.UNAUTHORIZED).json({ message: "Authentication faileds" });
                return;
            }
            req.user = null;
            next();
        }
    };
};
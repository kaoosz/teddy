// middleware/local.authenticate.ts
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

export const localAuthentication = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    
    return passport.authenticate('local', { session: false }, (err: any, user: any, info: any) => {
        try {
            if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (!user) {
                return res.status(401).json({ message: info.message });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET || 'secret'
            );

            return res.json({ token });
        } catch (error) {
            console.log("Error in auth:", error);
            return res.status(500).json({ message: 'Authentication failed' });
        }
    })(req, res, next);
};
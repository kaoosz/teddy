import { NextFunction, Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { STATUS } from "../utils/statusCode";

export const localAuthentication = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    
    return passport.authenticate('local', { session: false }, (err: any, user: any, info: any) => {
        try {
            if (err) {
                return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
            }

            if (!user) {
                return res.status(STATUS.NOT_FOUND).json({ message: info.message });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET || 'secret'
            );

            return res.json({ token });
        } catch (error) {
            return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Authentication failed' });
        }
    })(req, res, next);
};

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../interfaces/iUser.repository";

export function ValidateJwt(userRepository: IUserRepository) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const authHeader = req.headers.authorization;

            if(!authHeader || !authHeader.startsWith("Bearer ")) {

                res.status(401).json({
                    valid: false,
                    message: "no token provided"
                });
                return;
            }

            const token = authHeader.split(" ")[1];

            let decoded;

            try {
                decoded = jwt.verify(
                    token,
                    process.env.JWT_SECRET || 'dGhpc2lzYXNlY3JldGtleWZvcmp3dHRva2Vu'
                ) as { id: number, email: string };

                console.log("decoded",decoded);
            } catch (jwtError) {
                console.log("jwtError",jwtError);
                res.status(401).json({
                    valid: false,
                    message: "Invalid token"
                });
                return;
            }

            const user = await userRepository.findOneById(decoded.id);
            
            if (!user) {

                res.status(401).json({ 
                    valid: false, 
                    message: "User not found" 
                });
                return;
            }

            const { password, ...userWithoutPassword } = user;
            req.user = userWithoutPassword;

            next();
            
        } catch (error) {
            console.log("error: ", error);
            res.status(401).json({
                valid: false,
                message: error
            });
            return;
        }
    };
}
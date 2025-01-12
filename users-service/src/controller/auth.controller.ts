import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";
import { LoginDto } from "../dto/auth.dto";
import { AppError } from "../utils/error";
import { STATUS } from "../utils/statusCode";


export class AuthController {

    constructor(private authService: AuthService){}

    async login(req: Request, res: Response): Promise<void>{
        
        try {
            const loginDto: LoginDto = req.body;
            const token = await this.authService.login(loginDto);

            res.status(200).json(token);
        } catch (error) {
            if(error instanceof AppError){
                const status = error.statusCode || STATUS.INTERNAL_SERVER_ERROR;
                const message = error.message || STATUS.DEFAULT_ERROR;
                res.status(status).json({ error: message });
            } else{
                res.status(STATUS.INTERNAL_SERVER_ERROR).json({ 
                    error: STATUS.DEFAULT_ERROR 
                });
            }
        }
    }
}
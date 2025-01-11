import { Request, Response } from "express";
import { AuthService } from "../service/auth.service";
import { LoginDto } from "../dto/auth.dto";


export class AuthController {

    constructor(private authService: AuthService){}

    async login(req: Request, res: Response): Promise<void>{
        
        try {
            const loginDto: LoginDto = req.body;
            console.log("loginDto",loginDto);
            const token = await this.authService.login(loginDto);

            res.status(200).json(token);
        } catch (error) {
            console.error("error",error);
            // TODO loger
            // res.status(402).json({error: error})
        }
    }
}
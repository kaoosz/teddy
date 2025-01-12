import { Request, Response } from "express";
import { CreateUserDto } from "../dto/user.dto";
import { STATUS } from "../utils/statusCode";
import { UserService } from "../service/user.service";
import { AppError } from "../utils/error";


export class UserController {

    constructor(private userService: UserService){}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const createUserDto: CreateUserDto = req.body;
            const user = await this.userService.create(createUserDto);
            res.status(STATUS.CREATED).json(user);
        } catch (error) {
            if(error instanceof AppError){
                const status = error.statusCode || STATUS.INTERNAL_SERVER_ERROR;
                const message = error.message || STATUS.DEFAULT_ERROR;
                res.status(status).json({ error: message });
            }else{
                res.status(STATUS.INTERNAL_SERVER_ERROR).json({ 
                    error: STATUS.DEFAULT_ERROR 
                });
            }
        }
    }

    
}
import { Request, Response } from "express";
import { CreateUserDto } from "../dto/user.dto";
import { STATUS } from "../utils/statusCode";
import { UserService } from "../service/user.service";


export class UserController {

    constructor(private userService: UserService){}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const createUserDto: CreateUserDto = req.body;
            const user = await this.userService.create(createUserDto);
            res.status(STATUS.CREATED).json(user);
        } catch (error) {
            
        }
    }

    
}
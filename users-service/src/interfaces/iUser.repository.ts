import { CreateUserDto } from "../dto/user.dto";
import { IUser } from "../models/iUser.interface";


export interface IUserRepository {
    create(data: CreateUserDto) : Promise<IUser>
}
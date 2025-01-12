import { CreateUserDto } from "../dto/user.dto";
import { IUser } from "../models/iUser.interface";


export interface IUserRepository {
    create(data: CreateUserDto) : Promise<IUser>
    findOneById(id: number) : Promise<IUser | null>
    findOneByEmail(email: string) : Promise<IUser | null>
}
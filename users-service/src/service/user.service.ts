import { CreateUserDto } from "../dto/user.dto";
import { IUserRepository } from "../interfaces/iUser.repository";
import { IUser } from "../models/iUser.interface";



export class UserService implements IUserRepository {
    constructor(private userRepository: IUserRepository){}

    async create(data: CreateUserDto): Promise<IUser> {
        return await this.userRepository.create(data);
    }
}

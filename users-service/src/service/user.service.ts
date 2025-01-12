import { CreateUserDto } from "../dto/user.dto";
import { IUserRepository } from "../interfaces/iUser.repository";
import { IUser } from "../models/iUser.interface";
import { AppError} from "../utils/error";
import { STATUS } from "../utils/statusCode";



export class UserService {
    constructor(private userRepository: IUserRepository){}

    async create(data: CreateUserDto): Promise<IUser> {
        const exists = await this.userRepository.findOneByEmail(data.email);

        if(exists) {
            throw new AppError('The email is already taken', STATUS.CONFLICT);
        }
        return await this.userRepository.create(data);
    }
}

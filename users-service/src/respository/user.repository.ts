import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "../dto/user.dto";
import { IUserRepository } from "../interfaces/iUser.repository";
import { IUser } from "../models/iUser.interface";


export class UserRepository implements IUserRepository {

    constructor(private prisma: PrismaClient) {}

    async create(data: CreateUserDto): Promise<IUser> {
        return await this.prisma.user.create({data});

    }

    async findOneByEmail(email: string): Promise<IUser | null> {
        return await this.prisma.user.findFirst({
            where:{
                email: email
            }
        });
    }

    async findOneById(id: number): Promise<IUser | null> {
        return await this.prisma.user.findFirst({
            where:{
                id: id
            }
        });
    }
}
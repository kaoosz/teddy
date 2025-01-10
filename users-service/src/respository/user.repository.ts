import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "../dto/user.dto";
import { IUserRepository } from "../interfaces/iUser.repository";
import { IUser } from "../models/iUser.interface";
import { DatabaseClient, PrismaDatabase } from "../service/prisma.service";



export class UserRepository implements IUserRepository {
    // private pp = PrismaDatabase.getInstance().getClient();
    // constructor(private prisma: PrismaClient) {}
    constructor(private readonly prisma: DatabaseClient) {}
    

    async create(data: CreateUserDto): Promise<IUser> {
        // return await this.pp.user.create({data});
        return await this.prisma.user.create({data});
    }
}

import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../respository/user.repository";

export class Registry {
    private static instance: Registry;
    private prismaClient: PrismaClient;
    private userRepository: UserRepository;

    private constructor() {
        this.prismaClient = new PrismaClient();
        this.userRepository = new UserRepository(this.prismaClient);
    }

    public static getInstance(): Registry {
        if (!Registry.instance) {
            Registry.instance = new Registry();
        }
        return Registry.instance;
    }

    getPrismaClient(): PrismaClient {
        return this.prismaClient;
    }

    getUserRepository(): UserRepository {
        return this.userRepository;
    }
}
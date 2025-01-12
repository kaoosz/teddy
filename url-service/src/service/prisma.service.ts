import { PrismaClient } from "@prisma/client";


export class PrismaDatabase {
    private static instance: PrismaDatabase;
    private prisma: PrismaClient;

    private constructor(){
        this.prisma = new PrismaClient({
            log: ['error']
        })
    }

    public static getInstance(): PrismaDatabase {
        if(!PrismaDatabase.instance) {
            PrismaDatabase.instance = new PrismaDatabase();
        }
        return PrismaDatabase.instance;
    }

    public getClient(): PrismaClient {
        return this.prisma;
    }
}

export const createPrismaClient = () => {
    return new PrismaClient({

    })
}

export type DatabaseClient = PrismaClient;
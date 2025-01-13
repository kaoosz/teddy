import { PrismaClient } from "@prisma/client";

export class PrismaDatabase {
    private static instance: PrismaDatabase;
    private prisma: PrismaClient;

    private constructor(databaseUrl?: string){
        this.prisma = new PrismaClient({
            log: ['error'],
            datasources: {
                db: {
                    url: databaseUrl || process.env.DATABASE_URL
                }
            }
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
    return PrismaDatabase.getInstance().getClient();
}

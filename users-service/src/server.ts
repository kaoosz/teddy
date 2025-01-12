import { PrismaClient } from "@prisma/client";
import { app } from "./app"
// export const PORT = process.env.PORT || 3008;

async function bootstrap() {
    try {
        app.listen(3001, () => {
            console.log("Server is online 3001");
            // const prisma = new PrismaClient();
            // prisma.$queryRaw`SELECT current_database()`.then(console.log);
            
        } )
    } catch (error) {
        console.error("Failed to start Users Service:", error);
    }
}

bootstrap();
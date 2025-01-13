import { app } from "./app"

async function bootstrap() {
    try {
        app.listen(3001, () => {
            console.log("Server is online 3001");
            
        } )
    } catch (error) {
        console.error("Failed to start Users Service:", error);
    }
}

bootstrap();
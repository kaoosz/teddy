import { app } from "./app"

async function bootstrap() {
    try {
        app.listen(process.env.PORT, () => {
            console.log("Server is online 3000");
        } )
    } catch (error) {
        
    }
}

bootstrap();
import { app } from "./app"
export const PORT = process.env.PORT || 3008;

async function bootstrap() {
    try {
        app.listen(PORT, () => {
            console.log("Server is online");
        } )
    } catch (error) {
        
    }
}

bootstrap();
import express from "express";
import swaggerDocs from "./swagger";
import swaggerUi from 'swagger-ui-express';
import cors from "cors";

export const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

app.use("/docs",swaggerUi.serve, swaggerUi.setup(swaggerDocs));

async function bootstrap() {
    try {
        app.listen(PORT, () => {
            console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
        } )
    } catch (error) {
        console.error("error server",error);
        return;
    }
}

bootstrap();
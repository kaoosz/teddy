import express from "express";
import urlRoutes from "../src/routes/url.routes";
import cors from "cors";

export const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(urlRoutes);

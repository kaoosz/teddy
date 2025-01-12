import express from "express";
import urlRoutes from "../src/routes/url.routes";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(urlRoutes);
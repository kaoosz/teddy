import express from "express";
import userRoutes from "./routes/user.routes";
import { configureLocalStrategy } from "./service/local.strategy";
import passport from "passport";
import { configureJwtStrategy } from "./service/jwt.strategy";
import { Registry } from "./config/register";

export const app = express();
const registry = Registry.getInstance();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

configureLocalStrategy(passport,registry.getUserRepository());
configureJwtStrategy(passport, registry.getUserRepository());

app.use(userRoutes);
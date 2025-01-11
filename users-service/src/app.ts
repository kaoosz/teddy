import express from "express";
import userRoutes from "./routes/user.routes";
import { configureLocalStrategy } from "./service/local.strategy";
import passport from "passport";
import { UserRepository } from "./respository/user.repository";
import { createPrismaClient } from "./service/prisma.service";
import { configureJwtStrategy } from "./service/jwt.strategy";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());

const db = createPrismaClient();
const userRepository = new UserRepository(db);

configureLocalStrategy(passport,userRepository);
configureJwtStrategy(passport, userRepository);

app.use(userRoutes);
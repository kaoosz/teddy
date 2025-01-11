import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { UserService } from "../service/user.service";
import { UserRepository } from "../respository/user.repository";
import { createPrismaClient, PrismaDatabase } from "../service/prisma.service";
import { localAuthentication } from "../middleware/local.authenticate";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../service/auth.service";
import { validateCreateUser } from "../middleware/create.user";

const router = Router();

const db = createPrismaClient();

const userRepository = new UserRepository(db);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.get("/users", async(req,res) => {
    const result = await db.user.findMany({});
    res.status(206).json({result});
});

router.get("/test", async(req,res) => {
    console.log("Online");
    res.status(209).json('user');
});

router.post("/auth/login",localAuthentication, (req,res) => {
    authController.login(req,res);
});

router.post("/users",validateCreateUser, (req,res) => {
    userController.create(req,res);
});

export default router;
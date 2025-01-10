import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { UserService } from "../service/user.service";
import { UserRepository } from "../respository/user.repository";
import { createPrismaClient, PrismaDatabase } from "../service/prisma.service";


const router = Router();

// const pp = PrismaDatabase.getInstance().getClient();

const db = createPrismaClient();

const userRepository = new UserRepository(db);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get("/users", (req,res) => {
    console.log("deu boa");
    res.status(206).json({});
});

// router.post("/users", (req,res) => {
//     userController.create(req,res);
// });

export default router;
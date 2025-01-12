import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { UserService } from "../service/user.service";
import { localAuthentication } from "../middleware/local.authenticate";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../service/auth.service";
import { validateCreateUser } from "../middleware/create.user";
import { ValidateJwt } from "../middleware/validate.jwt";
import { Registry } from "../config/register";

const router = Router();
const registry = Registry.getInstance();


const userRepository = registry.getUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const authService = new AuthService(userRepository);
const authController = new AuthController(authService);


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

router.get("/validate-token",ValidateJwt(registry.getUserRepository()), (req,res) => {
    console.log("chamado");
    res.json({
        valid: true,
        user: req.user
    });
});

export default router;
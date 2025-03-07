import { Router } from "express";
import { login, registerAdmin, register } from "./auth.controller.js"; 
import { loginValidator, registerAdminValidator, registerValidator } from "../middlewares/user-validator.js"; 

const router = Router();

router.post("/login", loginValidator, login);

router.post("/register/admin", registerAdminValidator, registerAdmin);

router.post("/register", registerValidator, register);


export default router;
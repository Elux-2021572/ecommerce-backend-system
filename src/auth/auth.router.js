import { Router } from "express";
import { registerAdmin, register, login } from "./auth.controller.js"; 
import { registerAdminValidator, loginValidator, registerValidator } from "../middlewares/user-validator.js"; 

const router = Router();

router.post("/register/admin", registerAdminValidator, registerAdmin);

router.post("/register", registerValidator, register);

router.post("/login", loginValidator, login);

export default router;
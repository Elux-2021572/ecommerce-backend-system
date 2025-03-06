import { Router } from "express";
import { registerAdmin, register, login } from "./auth.controller.js"; // Importa las funciones del controlador
import { registerAdminValidator, loginValidator, registerValidator } from "../middlewares/user-validator.js"; // Importa los middlewares de validación

const router = Router();

// Ruta para registrar un administrador
router.post("/admin/register", registerAdminValidator, registerAdmin);

// Ruta para registrar un usuario normal
router.post("/register", registerValidator, register);

// Ruta para iniciar sesión
router.post("/login", loginValidator, login);

export default router;
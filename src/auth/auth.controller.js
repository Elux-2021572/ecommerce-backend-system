import { hash, verify } from "argon2"; // Para encriptar y verificar contraseñas
import User from "../user/user.model.js"; // Importa tu modelo de usuario
import { generateJWT } from "../helpers/generate-jwt.js"; // Función para generar tokens JWT

// Función para registrar un administrador
export const registerAdmin = async (req, res) => {
    try {
        const data = req.body;

        // Encriptar la contraseña
        const encryptedPassword = await hash(data.password);
        data.password = encryptedPassword;

        // Asignar el rol de administrador
        data.role = "ADMIN_ROLE";

        // Crear el usuario en la base de datos
        const user = await User.create(data);

        // Respuesta exitosa
        return res.status(201).json({
            message: "Admin user has been created",
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (err) {
        // Manejo de errores
        return res.status(500).json({
            message: "Admin registration failed",
            error: err.message
        });
    }
};

// Función para registrar un usuario normal
export const register = async (req, res) => {
    try {
        const data = req.body;

        // Encriptar la contraseña
        const encryptedPassword = await hash(data.password);
        data.password = encryptedPassword;

        // Crear el usuario en la base de datos
        const user = await User.create(data);

        // Respuesta exitosa
        return res.status(201).json({
            message: "User has been created",
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (err) {
        // Manejo de errores
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
        });
    }
};

// Función para iniciar sesión
export const login = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        // Buscar al usuario por correo o nombre de usuario
        const user = await User.findOne({
            $or: [{ email: email }, { username: username }]
        });

        // Si no se encuentra el usuario
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
                error: "User or email does not exist"
            });
        }

        // Verificar la contraseña
        const validPassword = await verify(user.password, password);

        // Si la contraseña no es válida
        if (!validPassword) {
            return res.status(400).json({
                message: "Invalid credentials",
                error: "Incorrect password"
            });
        }

        // Generar un token JWT
        const token = await generateJWT(user.id);

        // Respuesta exitosa
        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        // Manejo de errores
        return res.status(500).json({
            message: "Login failed, server error",
            error: err.message
        });
    }
};
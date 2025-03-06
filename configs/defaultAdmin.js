import { hash } from "argon2"; 
import User from "../src/user/user.model.js";

export const defaultAdmin = async () => {
    try {
        const adminExist = await User.findOne({ role: "ADMIN_ROLE" });

        if (adminExist) {
            return console.log("There is already an administrator");
        }

        await User.create({
            name: "Emilio", 
            surname: "Lux", 
            username: "Kernel", 
            email: "emiliojo.lux@gmail.com", 
            password: await hash("EmLo06.20#"), 
            phone: "12345678", 
            role: "ADMIN_ROLE", 
            status: true 
        });

        console.log("Default administrator successfully created");
    } catch (err) {
        console.error("Error creating administrator:", err.message);
    }
};
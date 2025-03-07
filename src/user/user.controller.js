import User from "./user.model.js";
import { hash, verify } from "argon2";

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const { ...data } = req.body;

        const user = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating user",
            error: error.message,
        });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { username, ...data } = req.body;
        const { uid } = req.params;

        if (req.usuario._id.toString() !== uid) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this profile",
            });
        }

        if (username) {
            const existingUser = await User.findOne({ username });
            if (existingUser && existingUser._id.toString() !== uid) {
                return res.status(400).json({
                    success: false,
                    message: "Username already exists",
                });
            }
            data.username = username;
        }

        const user = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating profile",
            error: error.message,
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params;

        const user = await User.findByIdAndDelete(uid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting user",
            error: error.message,
        });
    }
};

export const deleteUserProfile = async (req, res) => {
    try {
        const { uid } = req.params;
        const { confirmDeletion } = req.body;

        if (req.usuario._id.toString() !== uid) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this profile",
            });
        }

        if (!confirmDeletion || confirmDeletion !== "DELETE_PROFILE") {
            return res.status(400).json({
                success: false,
                message: "You must confirm the deletion by providing the correct confirmation code.",
            });
        }

        const user = await User.findByIdAndDelete(uid);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Delete User",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting user",
            error: error.message,
        });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params;
        const { oldPassword, newPassword } = req.body;

        if (req.usuario._id.toString() !== uid) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this password",
            });
        }

        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isOldPasswordCorrect = await verify(user.password, oldPassword);
        if (!isOldPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "The current password is incorrect",
            });
        }

        const isNewPasswordSame = await verify(user.password, newPassword);
        if (isNewPasswordSame) {
            return res.status(400).json({
                success: false,
                message: "The new password cannot be the same as the previous one",
            });
        }

        const hashedPassword = await hash(newPassword);
        await User.findByIdAndUpdate(uid, { password: hashedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating password",
            error: error.message,
        });
    }
};

export const updateRole = async (req, res) => {
    try {
        const { uid } = req.params;
        const { role } = req.body;

        const updatedUser = await User.findByIdAndUpdate(uid, { role }, { new: true });

        res.status(200).json({
            success: true,
            message: "Role updated successfully",
            updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating role",
            error: error.message,
        });
    }
};




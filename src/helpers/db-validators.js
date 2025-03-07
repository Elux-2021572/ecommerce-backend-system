import User from "../user/user.model.js";
import Product from "../product/product.model.js";
import Category from "../category/category.model.js";

export const emailExists = async (email = "") => {
    const existe = await User.findOne({ email });
    if (existe) {
        throw new Error(`The email ${email} is already registered`);
    }
};

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({ username });
    if (existe) {
        throw new Error(`The username ${username} is already registered`);
    }
};

export const userExists = async (uid = "") => {
    const existe = await User.findById(uid);
    if (!existe) {
        throw new Error("No user exists with the provided ID");
    }
};

export const adminRole = async (uid = "", { req }) => {
    if (!req.usuario || !req.usuario.role) {
        throw new Error("Could not verify the user's role");
    }

    const userModify = await User.findById(uid);
    if (!userModify) {
        throw new Error("User not found");
    }

    if (req.usuario._id.toString() === uid) {
        return;
    }

    if (userModify.role === "ADMIN_ROLE" && req.usuario.role === "ADMIN_ROLE") {
        throw new Error("You do not have permission to modify another admin");
    }
};

export const adminRoleDelete = async (uid = "", { req }) => {
    if (!req.usuario || !req.usuario.role) {
        throw new Error("Could not verify the user's role");
    }

    const userModify = await User.findById(uid);
    if (!userModify) {
        throw new Error("User not found");
    }

    if (req.usuario._id.toString() === uid) {
        return;
    }

    if (userModify.role === "ADMIN_ROLE" && req.usuario.role === "ADMIN_ROLE") {
        throw new Error("You do not have permission to delete another admin");
    }
};

export const userUpdateProfile = async (uid = "", { req }) => {
    try {
        if (!req.usuario) {
            throw new Error("User not authenticated");
        }

        const user = await User.findById(uid);
        if (!user) {
            throw new Error("User not found");
        }

        if (user._id.toString() !== req.usuario._id.toString()) {
            throw new Error("You can't update this profile");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export const categoryExists = async (nameCategory = "") => {
    const exist = await Category.findOne({nameCategory});
    if (exist) {
        throw new Error(`The Category: ${nameCategory} already exists`);
    }
};

export const productExists = async (nameProduct = "") => {
    const exist = await Product.findOne({nameProduct});
    if (exist) {
        throw new Error(`The product: ${nameProduct} already exists`);
    }
}
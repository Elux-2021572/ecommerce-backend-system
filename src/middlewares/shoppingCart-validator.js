import { body } from "express-validator";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { productExists } from "../helpers/db-validators.js";
import { hasRoles } from "./validate-roles.js";
import { validateJWT } from "./validate-jwt.js"


export const addProductToCartValidator = [
    validateJWT, 
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"), 
    body("productId").isMongoId().withMessage("Not a valid MongoDB ID") .custom(productExists),
    body("quantity").isInt({ gt: 0 }).withMessage("Quantity must be a positive integer"), 
    validateFields,
    handleErrors, 
];

export const getCartProductsValidator = [
    validateFields, 
    handleErrors,
];

export const deleteProductFromCartValidator = [
    validateJWT, 
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    body("productId").isMongoId().withMessage("Not a valid MongoDB ID") .custom(productExists),
    validateFields, 
    handleErrors, 
];

import { body, param } from "express-validator";
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { hasRoles } from "../middlewares/validate-roles.js";

export const updateBillValidator = [
    validateJWT, 
    hasRoles("ADMIN_ROLE"), 
    param("bip").notEmpty().withMessage("Bill ID is required"),
    param("bip").isMongoId().withMessage("Invalid bill ID"),
    body("quantity").notEmpty().withMessage("Quantity is required").isInt({ gt: 0 }).withMessage("Quantity must be a positive integer"),
    body("productId").notEmpty().withMessage("Product ID is required").isMongoId().withMessage("Invalid product ID"), 
    validateFields, 
    handleErrors
]
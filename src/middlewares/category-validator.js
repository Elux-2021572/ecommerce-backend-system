import { body, param } from "express-validator";
import { handleErrors } from "./handle-errors.js";
import { validateFields } from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";


export const createCategoryValidator  = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("nameCategory").notEmpty().withMessage("The name category is required"),
    body("nameCategory").isLength({max: 50}).withMessage("The name category cannot exceed 50 characters"),
    body("descriptionCategory").notEmpty().withMessage("The description is required"),
    body("descriptionCategory").isLength({max: 200}).withMessage("The description cannot exceed 200 characters"),
    validateFields,
    handleErrors
];

export const updateCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("It is not a valid ID"),
    body("nameCategory").optional().notEmpty().withMessage("Name is required"),
    body("nameCategory").optional().isLength({max: 50}).withMessage("The name category cannot exceed 50 characters"),
    body("descriptionCategory").optional().notEmpty().withMessage("Description is required"),
    body("descriptionCategory").optional().isLength({max: 200}).withMessage("The description cannot exceed 200 characters"),
    validateFields,
    handleErrors
];

export const deleteCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("It is not a valid ID"),
    validateFields,
    handleErrors
];
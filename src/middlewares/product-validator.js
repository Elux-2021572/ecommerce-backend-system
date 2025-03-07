import { body, param } from "express-validator"
import { validateFields } from "./validate-fields.js"
import { handleErrors } from "./handle-errors.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"
import { deleteFileOnError } from "./delete-file-on-error.js"
import { productExists } from "../helpers/db-validators.js"

export const createdProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("nameProduct").notEmpty().withMessage("Name product is required"),
    body("nameProduct").custom(productExists),
    body("price").notEmpty().withMessage("Price is required"),
    body("price").isDecimal({min: 0}).withMessage("The price must not be less than 0"),
    body("stock").notEmpty().withMessage("Stock is required"),
    body("stock").isInt().withMessage("Stock must be a number"),
    validateFields,
    deleteFileOnError,
    handleErrors
]

export const getProductValidator = [
    validateFields,
    handleErrors
]

export const updateProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("It is not a valid ID"),
    body("nameProduct").optional().notEmpty().withMessage("Name product is required"),
    body("nameProduct").optional().custom(productExists),
    body("descriptionProduct").optional().notEmpty().withMessage("Description is required"),
    body("price").optional().notEmpty().withMessage("Price is required"),
    body("price").optional().isDecimal({min: 0}).withMessage("The price must not be less than 0"),
    validateFields,
    deleteFileOnError,
    handleErrors
]

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("It is not a valid ID"),
    param("uid").notEmpty().withMessage("The ID is required"),
    validateFields,
    handleErrors
]

export const getMostSoldProductsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    validateFields,
    handleErrors
]

export const getSoldOutProductsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE" , "USER_ROLE"),
    validateFields,
    handleErrors
]

export const inventoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validateFields,
    handleErrors
]

export const filterProductsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "USER_ROLE"),
    body("category").optional().notEmpty().withMessage("Category is required"),
    body("sort").optional().notEmpty().withMessage("Sort is required"),
    body("keyWords").optional().notEmpty().withMessage("Key words is required"),
    validateFields,
    deleteFileOnError,
    handleErrors
]

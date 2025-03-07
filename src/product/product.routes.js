import { Router } from "express";
import { createdProductValidator, getProductValidator, updateProductValidator, deleteProductValidator, getMostSoldProductsValidator, getSoldOutProductsValidator, inventoryValidator, filterProductsValidator } from "../middlewares/product-validator.js";
import { addProduct, getProduct, updateProduct, deleteProduct, getMostSoldProducts, getSoldOutProducts, inventory , filterProducts } from "../product/product.controller.js";

const router = Router();

router.post("/addProduct", createdProductValidator, addProduct );

router.get("/",getProductValidator, getProduct );

router.put("/updateProduct/:uid", updateProductValidator, updateProduct );

router.delete("/deleteProduct/:uid",deleteProductValidator, deleteProduct );

router.get("/most-sold",getMostSoldProductsValidator, getMostSoldProducts);

router.get("/sold-out",getSoldOutProductsValidator, getSoldOutProducts );

router.get("/inventory",inventoryValidator, inventory );

router.get("/filter",filterProductsValidator, filterProducts);

export default router;

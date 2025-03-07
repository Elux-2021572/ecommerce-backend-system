import { Router } from "express";
import { updateBill } from "./bill.controller.js";
import { updateBillValidator } from "../middlewares/bill-validator.js";

const router = Router();

router.put("/updateBill/:bip", updateBillValidator, updateBill);

export default router;
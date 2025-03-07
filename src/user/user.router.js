import { Router } from "express";
import { updateUser,deleteUser, deleteUserProfile, updateRole, updateUserProfile, updatePassword } from "./user.controller.js";
import { deleteUserValidator, updateRolValidator, updateUserValidator, updateProfileValidator, deleteProfileValidator, updatePasswordValidator } from "../middlewares/user-validator.js";

const router = Router();

router.put("/updateUser/admin/:uid", updateUserValidator, updateUser);

router.put("/updateProfile/:uid", updateProfileValidator, updateUserProfile);

router.delete("/deleteUser/admin/:uid", deleteUserValidator, deleteUser);

router.delete("/deleteProfile/:uid", deleteProfileValidator, deleteUserProfile);

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword);

router.patch("/updateRol/admin/:uid", updateRolValidator, updateRole);


export default router;

import { Router } from "express";
import { deleteUser, updateRol, updateUser, updateUserProfile, updateProfilePicture, updatePassword } from "./user.controller.js";
import { deleteUserValidator, updateRolValidator, updateUserValidator, updateProfileValidator, deleteProfileValidator, updateProfilePictureValidator, updatePasswordValidator } from "../middlewares/user-validators.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

router.patch("/updateRol/:uid", updateRolValidator, updateRol);

router.put("/updateUser/:uid", updateUserValidator, updateUser);

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser);

router.put("/updateProfile/:uid", updateProfileValidator, updateUserProfile);

router.delete("/deleteProfile/:uid", deleteProfileValidator, deleteUser);

router.patch("/updateProfilePicture/:uid", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture);

router.patch("/updatePassword/:uid", updatePasswordValidator, updatePassword);

export default router;

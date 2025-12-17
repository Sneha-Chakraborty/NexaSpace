import { Router } from "express";
import { registerController, loginController, meController, logoutController } from "../../controllers/auth.controller.js";
import {
  validateRegisterBody,
  validateLoginBody
} from "../../validations/auth.validation.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validateRegisterBody, registerController);
router.post("/login", validateLoginBody, loginController);
router.get("/me", authMiddleware, meController);
router.post("/logout", authMiddleware, logoutController);
export default router;

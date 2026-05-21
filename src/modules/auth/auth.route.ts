import { Router } from "express";
import type { Router as RouterType } from "express";
import authController from "./auth.controller.js";

const router: RouterType = Router();

router.post('/signup', authController.userSignup);
router.post('/login', authController.userLogin);

export default router;
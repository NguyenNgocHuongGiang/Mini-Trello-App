import express from "express";
import { createSignInCode, createSignUpCode, signin, signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/send-code-signup", createSignUpCode);
router.post("/send-code-signin", createSignInCode);

export default router;

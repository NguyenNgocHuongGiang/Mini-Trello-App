import { db } from "../config/firebase.js";
import {
  createUserWithVerification,
  createVerificationCode,
  signInWithVerification,
} from "../services/authService.js";

export const signup = async (req, res) => {
  const { email, verificationCode } = req.body;

  if (!email || !verificationCode) {
    return res
      .status(400)
      .json({ error: "Email and verification code are required." });
  }

  try {
    const newUser = await createUserWithVerification(email, verificationCode);
    return res.status(201).json(newUser);
  } catch (error) {
    let status = 500;
    if (error.message === "Invalid or expired verification code") status = 400;
    if (error.message === "Email already registered") status = 409;

    return res.status(status).json({ error: error.message });
  }
};

export const signin = async (req, res) => {
  const { email, verificationCode } = req.body;

  if (!email || !verificationCode) {
    return res
      .status(400)
      .json({ error: "Email and verification code are required." });
  }

  try {
    const { accessToken } = await signInWithVerification(
      email,
      verificationCode
    );

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.log(error);
    
    const isUnauthorizedError =
      error.message === "Invalid or expired verification code" ||
      error.message === "User not found. Please sign up first.";

    return res
      .status(isUnauthorizedError ? 401 : 500)
      .json({ error: "Invalid email or verification code" });
  }
};

export const createSignUpCode = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const usersSnapshot = await db.ref("users").once("value");
  const users = usersSnapshot.val() || {};
  const emailExists = Object.values(users).some((user) => user.email === email);

  if (emailExists) {
    return res.status(400).json({ error: "Email already registered" });
  }

  try {
    const mess = await createVerificationCode(email);
    return res.status(201).json(mess);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send verification code" });
  }
};

export const createSignInCode = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const usersSnapshot = await db.ref("users").once("value");
    const users = usersSnapshot.val() || {};
    const emailExists = Object.values(users).some(
      (user) => user.email === email
    );

    if (!emailExists) {
      return res
        .status(400)
        .json({ error: "Email not found. Please sign up first." });
    }

    // Gửi mã xác thực
    const mess = await createVerificationCode(email);
    return res.status(200).json(mess);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send verification code" });
  }
};

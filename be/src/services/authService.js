import { db } from "../config/firebase.js";
import { formatEmailKey, generateCode, generateToken } from "../utils/helpers.js";
import { ref, set } from 'firebase/database';
import { sendEmailVerification } from "../utils/mailer.js";

export const createVerificationCode = async (email) => {
  const code = generateCode();

  await set(ref(db, `verifications/${formatEmailKey(email)}`), {
    verificationCode: code,
    createdAt: Date.now(),
  })

  await sendEmailVerification(email, code);

  return "Check your email for the verification code."
};

export const createUserWithVerification = async (email, verificationCode) => {
  const codeRef = db.ref(`verifications/${formatEmailKey(email)}`);
  const snapshot = await codeRef.once("value");
  const storedData = snapshot.val();

  if (!storedData || storedData.verificationCode !== verificationCode) {
    throw new Error("Invalid or expired verification code");
  }

  const userRef = db.ref("users");
  const usersSnapshot = await userRef.once("value");
  const users = usersSnapshot.val() || {};

  const emailExists = Object.values(users).some((user) => user.email === email);
  if (emailExists) {
    throw new Error("Email already registered");
  }

  const newUserRef = userRef.push();
  const newUser = {
    id: newUserRef.key,
    email,
  };

  await newUserRef.set(newUser);

  await codeRef.remove();

  return newUser;
};

export const signInWithVerification = async (email, verificationCode) => {
  const codeRef = db.ref(`verifications/${formatEmailKey(email)}`);
  const snapshot = await codeRef.once("value");
  const storedData = snapshot.val();

  if (!storedData || storedData.verificationCode !== verificationCode) {
    throw new Error("Invalid or expired verification code");
  }

  const userRef = db.ref("users");
  const usersSnapshot = await userRef.once("value");
  const users = usersSnapshot.val() || {};

  const user = Object.values(users).find((u) => u.email === email);
  if (!user) {
    throw new Error("User not found. Please sign up first.");
  }

  const token = generateToken({ id: user.id, email: user.email });

  await codeRef.remove(); 

  return { accessToken: token };
};

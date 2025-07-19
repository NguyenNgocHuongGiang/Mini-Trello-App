import jwt from "jsonwebtoken";

export const formatEmailKey = (email) => {
  return email.replace(".", "_").replace("@", "_");
};

export const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || "secret_secret_secret", {
    expiresIn: "1h",
  });
};
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmailVerification = async (toEmail, code) => {
  const mailOptions = {
    from: `"Mini-Trello" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your Verification Code",
    html: `
    <p>Your verification code is: <strong>${code}</strong></p>
    <p>This code will expire soon. Please use it quickly!</p>
  `,
  };

  await transporter.sendMail(mailOptions);
};

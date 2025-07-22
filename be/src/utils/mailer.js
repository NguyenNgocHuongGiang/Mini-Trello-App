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


export const sendInviteEmail = async (toEmail, boardId, cardId, inviteId) => {
  const acceptUrl = `${process.env.FRONTEND_URL}boards/${boardId}/invite/accept?inviteId=${inviteId}&status=accepted`;
  const declineUrl = `${process.env.FRONTEND_URL}boards/${boardId}/invite/accept?inviteId=${inviteId}&status=declined`;

  const mailOptions = {
    from: `"Mini-Trello" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "You've been invited to join a board",
    html: `
      <p>Hello,</p>
      <p>You have been invited to join a card on Mini-Trello.</p>
      <p>Please choose an option below:</p>
      <div style="margin-top: 16px;">
        <a href="${acceptUrl}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px; margin-right: 10px;">Accept</a>
        <a href="${declineUrl}" style="padding: 10px 20px; background-color: #f44336; color: white; text-decoration: none; border-radius: 4px;">Decline</a>
      </div>
      <p>If the buttons do not work, copy and paste the link below:</p>
      <p>Accept: <a href="${acceptUrl}">${acceptUrl}</a></p>
      <p>Decline: <a href="${declineUrl}">${declineUrl}</a></p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
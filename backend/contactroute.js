import express from "express";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

router.post("/send", async (req, res) => {
  const { firstname, lastname, email, message } = req.body;

  const msg = {
    to: process.env.TO_EMAIL,                       // YOU get the notification
    from: process.env.FROM_EMAIL,                   // Registered Gmail or SendGrid sender
    subject: "New Contact Form Submission",
    html: `
      <h2>New Contact Form Submission</h2>
      <p><b>Name:</b> ${firstname} ${lastname}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Message:</b> ${message}</p>
    `,
  };

  try {
    await sgMail.send(msg);
    return res.json({ success: true });
  } catch (err) {
    console.error("SendGrid Error:", err);
    return res.status(500).json({ success: false, error: "Email failed" });
  }
});

export default router;

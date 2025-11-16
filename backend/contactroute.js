import express from "express";
import { Resend } from "resend";
import dotenv from "dotenv";

// MUST be FIRST
dotenv.config();

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);


router.post("/send", async (req, res) => {
  const { firstname, lastname, email, message } = req.body;

  try {
    await resend.emails.send({
      from: "Reaz Party Rentals <onboarding@resend.dev>",
      to: "reazpartyrentals@gmail.com",

      // ⭐ This allows you to reply directly to the user's email
      reply_to: email, 

      subject: "New Contact Form Submission",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 10px;">
            
          <h2 style="color:#333;">New Contact Form Submission</h2>

          <p><b>Name:</b> ${firstname} ${lastname}</p>
          <p><b>Email:</b> ${email}</p>

          <h3 style="margin-top:20px;">Message</h3>
          <p>${message}</p>

        </div>
      `,
    });

    // Frontend success response
    res.json({ success: true });

  } catch (err) {
    console.error("Resend Error:", err);
    res.status(500).json({ success: false, error: "Email failed" });
  }
});

export default router;

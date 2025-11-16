// server/routes/quoteRoutes.js
import express from "express";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req, res) => {
  const data = req.body;

  // Build list of selected item quantities (anything ending in "qty")
  const itemRows = Object.entries(data)
    .filter(([key, val]) => key.toLowerCase().includes("qty") && val && val !== "0")
    .map(([key, val]) => {
      const label = key.replace(/qty/i, "").replace(/([A-Z])/g, " $1").trim();
      return `<li><b>${label}:</b> ${val}</li>`;
    })
    .join("");

  try {
    await resend.emails.send({
      from: "Reaz Party Rentals <onboarding@resend.dev>",
      to: "reazpartyrentals@gmail.com",

      // ⭐ Allows you to reply directly to the customer
      reply_to: data.email,

      subject: "New Quote Request Submission",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 10px;">

          <h2 style="color:#333;">New Quote Request</h2>

          <p><b>Name:</b> ${data.firstname} ${data.lastname}</p>
          <p><b>Email:</b> ${data.email}</p>
          <p><b>Phone:</b> ${data.phone}</p>
          <p><b>Event Address:</b> ${data.address}</p>

          <p><b>Setup Date:</b> ${data.setup}</p>
          <p><b>Pickup Date:</b> ${data.pickup}</p>

          <h3 style="margin-top: 20px;">Requested Items</h3>
          <ul>
            ${itemRows || "<li>No specific quantities provided.</li>"}
          </ul>

          <h3 style="margin-top: 20px;">Tent Sizes</h3>
          <p>${data.tents || "None provided"}</p>

          <h3 style="margin-top: 20px;">Additional Requests</h3>
          <p>${data.extra || "None"}</p>

        </div>
      `,
    });

    res.status(200).json({ success: true, message: "Quote request sent!" });

  } catch (error) {
    console.error("Resend Quote Error:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

export default router;

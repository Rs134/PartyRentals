// server/routes/quoteRoutes.js
import express from "express";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config();

const router = express.Router();

// ⭐ Correct SendGrid API key usage
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

  const msg = {
    to: "reazpartyrentals@gmail.com",
    from: "Reaz Party Rentals <reazpartyrentals@gmail.com>", // ⭐ your own verified sender
    replyTo: data.email, // ⭐ reply directly to customer
    subject: "New Quote Request Submission",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 10px;">
        <h2>New Quote Request</h2>

        <p><b>Name:</b> ${data.firstname} ${data.lastname}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone:</b> ${data.phone}</p>
        <p><b>Event Address:</b> ${data.address}</p>

        <p><b>Setup Date:</b> ${data.setup}</p>
        <p><b>Pickup Date:</b> ${data.pickup}</p>

        <h3>Requested Items</h3>
        <ul>${itemRows || "<li>No quantities entered.</li>"}</ul>

        <h3>Tent Sizes</h3>
        <p>${data.tents || "None provided"}</p>

        <h3>Additional Requests</h3>
        <p>${data.extra || "None"}</p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: true, message: "Quote request sent!" });
  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

export default router;

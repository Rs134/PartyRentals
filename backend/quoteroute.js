// server/routes/quoteRoutes.js
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post("/", async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    address,
    setup,
    pickup,
    chairsqty,
    whitechaircoversqty,
    cocktailqty,
    blackcocktailcoversqty,
    whitecocktailcoversqty,
    roundtablesqty,
    rectangleqty,
    sixarmsilverchandelier,
    eightarmsilverchandelier,
    tenarmgoldchandelier,
    chaferqty,
    tents,
    extra,
  } = req.body;

  try {
    const mailnotif = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFY_EMAIL,
      subject: "Request a Quote Submission",
      text: `
      Request a Quote Form:
      Name: ${firstname} ${lastname}
      Email: ${email}
      Phone: ${phone}
      Address: ${address}
      Setup Date: ${setup}
      Pickup Date: ${pickup}
      Chairs: ${chairsqty}
      White Chair Covers: ${whitechaircoversqty}
      Cocktail Tables: ${cocktailqty}
      Black Cocktail Covers: ${blackcocktailcoversqty}
      White Cocktail Covers: ${whitecocktailcoversqty}
      Round Tables: ${roundtablesqty}
      Rectangle Tables: ${rectangleqty}
      6 Arm Silver Chandelier: ${sixarmsilverchandelier}
      8 Arm Silver Chandelier: ${eightarmsilverchandelier}
      10 Arm Gold Chandelier: ${tenarmgoldchandelier}
      Chafers: ${chaferqty}
      Tent Sizes: ${tents}
      Additional Details: ${extra}
      `,
    };

    await transport.sendMail(mailnotif);
    res.status(200).json({ success: true, message: "Quote request sent!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

export default router;

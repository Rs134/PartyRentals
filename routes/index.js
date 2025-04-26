require('dotenv').config();
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Party Rentals', confirmation: req.query.confirmation || null });
});

router.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Removed database logic

    const mailnotif = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFY_EMAIL,
      subject: "Contact Form Submission",
      text: `Contact Form Submission\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transport.sendMail(mailnotif, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
        res.status(500).send('There was an error sending the email.');
        return;
      }
      console.log("Email sent: " + info.response);
    });

    res.redirect('/?confirmation=true');
  } catch (error) {
    console.error('Error processing contact form data:', error);
    res.status(500).send('There was an error processing your request.');
  }
});

module.exports = router;

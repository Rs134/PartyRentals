require('dotenv').config();
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { getCollection } = require('../models/db');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Party Rentals', confirmation: req.query.confirmation || null }); 
});

router.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const contactsCollection = getCollection('contacts');
    const newContact = {
      name: name,
      email: email,
      message: message
    };

    await contactsCollection.insertOne(newContact);

    const mailnotif = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFY_EMAIL,
      subject: "Contact Form Submission",
      text: 
      `Contact Form Submission
      Name: ${name},
      Email: ${email},
      Message: ${message}`,
    }

    transport.sendMail(mailnotif, (error,info) => {
      if(error){
        console.error("Error sending email: ", error)
      } else{
        console.log("Email sent: " + info.response)
      }
    })

    res.redirect('/?confirmation=true');
  } catch (error) {
    console.error('Error saving contact form data:', error);
    res.status(500).send('There was an error processing your request.');
  }
});

module.exports = router;

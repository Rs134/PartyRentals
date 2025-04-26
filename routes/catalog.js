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
    res.render('catalog', { title: 'Party Rentals', confirmation: req.query.confirmation || null }); 
});

router.post('/quoteSubmission', async (req, res) => {
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
        extra
    } = req.body;

    try {
        // Removed database logic

        const mailnotif = {
            from: process.env.EMAIL_USER,
            to: process.env.NOTIFY_EMAIL,
            subject: "Request a Quote Form Submission",
            text: `
                Request a Quote Form Details:
                First Name: ${firstname}
                Last Name: ${lastname}
                Email: ${email}
                Phone: ${phone}
                Address: ${address}
                Setup Date: ${setup}
                Pickup Date: ${pickup}
                Chairs: ${chairsqty}
                White Chair Covers: ${whitechaircoversqty}
                Cocktail Tables: ${cocktailqty}
                Black Cocktail Table Covers: ${blackcocktailcoversqty}
                White Cocktail Table Covers: ${whitecocktailcoversqty}
                Round Tables: ${roundtablesqty}
                Rectangle Tables: ${rectangleqty}
                6 Arm Silver Chandelier: ${sixarmsilverchandelier}
                8 Arm Silver Chandelier: ${eightarmsilverchandelier}
                10 Arm Gold Chandelier: ${tenarmgoldchandelier}
                Chafers: ${chaferqty}
                Tent Sizes: ${tents}
                Additional Details: ${extra}
            `
        };

        transport.sendMail(mailnotif, (error, info) => {
            if (error) {
                console.error("Error sending email: ", error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });

        res.redirect('/catalog/?confirmation=true');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('There was an error processing your request.');
    }
});

module.exports = router;

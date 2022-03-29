const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel")
const Bike = require('../models/bikeModel')
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51KhdgXSJaGUzL2E3Ktw5zF4mmvAXaGfSLjEqVxaz1ORFaIc185gXRhhBgdAQX4J1u3Wd2vsqBov69mogmTNB9126006wJZqAAy')


router.post("/bookbike", async (req, res) => {

    
    const { token } = req.body
    try {

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,

        });

        const payment = await stripe.charges.create({
            amount: req.body.totalAmount * 100,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email
        }, {
            idempotencyKey: uuidv4(),
        })

        if (payment) {
            req.body.transactionId = payment.source.id;
            const newbooking = new Booking(req.body);
            await newbooking.save();
            const bike = await Bike.findOne({ _id: req.body.bike });
            bike.bookedTimeSlots.push(req.body.bookedTimeSlots)

            await bike.save()
            res.send('Your booking is successfull')
        }
        else{
            return res.status(400).json(error);
        }


    } catch (error) {
        console.log(error)
        return res.status(400).json(error);
    }

});




module.exports = router
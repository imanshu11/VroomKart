const express = require("express");
const router = express.Router();

const Bike = require("../models/bikeModel")


router.get("/getallbikes", async (req, res) => {
    try {
        const bikes = await Bike.find()
        res.send(bikes)
    } catch (error) {
        return res.status(400).json(error);
    }
});



router.post("/addbike", async (req, res) => {

    try {

        const newbike = new Bike(req.body)
        await newbike.save()
        res.send('Bike added Successfully')

    } catch (error) {

        return res.status(400).json(error);

    }

});


router.post("/editbike", async (req, res) => {

    try {

        const bike = await Bike.findOne({ _id: req.body._id })
        bike.name = req.body.name
        bike.image = req.body.image
        bike.fuelType = req.body.fuelType
        bike.rentPerHour = req.body.rentPerHour
        bike.mileage = req.body.mileage

        await bike.save()

        res.send('Bike Details Updated Successfully')

    } catch (error) {

        return res.status(400).json(error);

    }

});



router.post("/deletebike", async (req, res) => {

    try {

        await Bike.findOneAndDelete({ _id: req.body.bikeid })



        res.send('Bike Deleted Successfully')

    } catch (error) {

        return res.status(400).json(error);

    }

});

module.exports = router;
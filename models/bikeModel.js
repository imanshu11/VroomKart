const mongoose = require("mongoose");


const bikeSchema = new mongoose.Schema({

    name : {type : String, required : true},
    image: {type: String, required : true},
    mileage: {type: Number, required : true},
    fuelType: {type: String, required: true},
    bookedTimeSlots: [
        {
            from: {type: String, required: true},
            to: {type: String, required: true}
        }
    ],

    rentPerHour: {type: Number, required: true}

}, {timestamps : true}

)


const bikeModel = mongoose.model('bikes', bikeSchema)
module.exports = bikeModel
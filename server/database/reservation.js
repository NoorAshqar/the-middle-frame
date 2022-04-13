const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let reservationSchema = new Schema({
    id: Number,
    startTime: Date,
    endTime: Date,
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    HotelId: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    //roomPrice: Float32Array //not needed!
},
    { timestamps: true });


let Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;


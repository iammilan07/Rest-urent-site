
const mongoose = require('mongoose');

const TableBookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tableNumber: { type: Number, required: true },
    bookedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TableBooking', TableBookingSchema);


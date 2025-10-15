const TableBooking = require('../models/TableBooking');

exports.bookTable = async (req, res) => {
    try {
        const { tableNumber } = req.body;
        const user = req.user.id; // from auth middleware

        // Check if already booked
        const existing = await TableBooking.findOne({ user, tableNumber });
        if (existing) return res.status(400).json({ message: 'Table already booked' });

        const booking = await TableBooking.create({ user, tableNumber });
        res.json(booking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const user = req.user.id;
        const bookings = await TableBooking.find({ user });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const user = req.user.id;
        const { tableId } = req.params;

        const booking = await TableBooking.findOne({ tableNumber: req.params.tableId, user });

        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        await booking.deleteOne();
        res.json({ message: 'Booking deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Fetch all booked tables
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await TableBooking.find({}, 'tableNumber'); // only need tableNumber
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

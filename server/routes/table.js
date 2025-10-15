const express = require('express');
const router = express.Router();
const { bookTable, getUserBookings, deleteBooking, getAllBookings } = require('../controllers/tableController');
const { protect } = require('../middleware/authMiddleware');

// Use the correct middleware name: protect
router.post('/', protect, bookTable);
router.get('/', protect, getUserBookings);
router.delete('/:tableId', protect, deleteBooking);
// routes/table.js
router.get('/all', getAllBookings);

module.exports = router;

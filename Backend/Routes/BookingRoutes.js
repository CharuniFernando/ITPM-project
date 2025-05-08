const express = require("express");
const router = express.Router();
const bookingController = require("../Controllers/BookingController");

// Create
router.post("/create", bookingController.createBooking);

// Admin - get all
router.get("/all", bookingController.getAllBookings);

// Get bookings by Gmail (for logged-in user)
router.get('/client/:gmail', bookingController.getBookingsByGmail);

// Client - get bookings by employeeId
router.get("/:bookingId", bookingController.getBookingById);

// Update
router.put("/:bookingId", bookingController.updateBookingById);

// Delete
router.delete("/delete/:id", bookingController.deleteBooking);

// Search by bookingId
router.get("/search/:bookingId", bookingController.searchBooking);

router.post('/login', bookingController.login);

module.exports = router;

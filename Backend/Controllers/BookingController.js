const Booking = require("../Model/Booking");
const Employee = require("../Model/UserModel");

// Hourly rates
const rates = {
  "Security Guard": 100,
  "Female Security Guard": 150,
  "VVIP": 300,
  "Bodyguard": 200,
};

// Utility to calculate hours between two date-times
function calculateWorkingHours(startDate, endDate, startTime, endTime) {
  const start = new Date(`${startDate}T${startTime}`);
  const end = new Date(`${endDate}T${endTime}`);
  const diff = (end - start) / (1000 * 60 * 60); // in hours
  return Math.max(diff, 0);
}

// CREATE booking
exports.createBooking = async (req, res) => {
  try {
    const { employeeId,gmail, guardType, noOfGuard, startDate, endDate, startTime, endTime } = req.body;

    const hours = calculateWorkingHours(startDate, endDate, startTime, endTime);
    const amount = hours * rates[guardType];

    const booking = new Booking({
      employeeId,
      gmail,
      guardType,
      noOfGuard,
      startDate,
      endDate,
      startTime,
      endTime,
      amount,
    });

    await booking.save();
    res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all bookings (admin)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("employeeId", "name gmail phone address");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET bookings for a client by employeeId
exports.getBookingsByEmployee = async (req, res) => {
  try {
    const bookings = await Booking.find({ employeeId: req.params.employeeId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE booking
exports.updateBooking = async (req, res) => {
  try {
    const { guardType, startDate, endDate, startTime, endTime } = req.body;
    const hours = calculateWorkingHours(startDate, endDate, startTime, endTime);
    const amount = noOfGuard*hours * rates[guardType];

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { guardType, startDate, endDate, startTime, endTime, amount },
      { new: true }
    );
    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE booking
exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SEARCH booking by bookingId
exports.searchBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.bookingId });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

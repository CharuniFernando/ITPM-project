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
    const { gmail, guardType, noOfGuard, startDate, endDate, startTime, endTime } = req.body;

    const hours = calculateWorkingHours(startDate, endDate, startTime, endTime);
    const amount = hours * rates[guardType];

    const booking = new Booking({
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
    const bookings = await Booking.find();

    // Fetch employee details based on gmail
    const populatedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const employee = await Employee.findOne({ gmail: booking.gmail });
        return {
          ...booking._doc,
          employeeDetails: employee ? {
            name: employee.name,
            gmail: employee.gmail,
            phone: employee.phone,
            address: employee.address,
          } : null,
        };
      })
    );

    res.json(populatedBookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET booking details by bookingId
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    // Fetch employee details based on gmail
    const employee = await Employee.findOne({ gmail: booking.gmail });

    res.json({
      ...booking._doc,
      employeeDetails: employee ? {
        name: employee.name,
        gmail: employee.gmail,
        phone: employee.phone,
        address: employee.address,
      } : null,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET bookings by Gmail (for logged-in user)
exports.getBookingsByGmail = async (req, res) => {
  try {
    const gmail = req.params.gmail;
    const bookings = await Booking.find({ gmail });

    const employee = await Employee.findOne({ gmail });

    const populatedBookings = bookings.map((booking) => ({
      ...booking._doc,
      employeeDetails: employee ? {
        name: employee.name,
        gmail: employee.gmail,
        phone: employee.phone,
        address: employee.address,
      } : null,
    }));

    res.json(populatedBookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// UPDATE booking by bookingId
exports.updateBookingById = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      req.body,
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ message: "Booking updated successfully!", booking: updatedBooking });
  } catch (err) {
    console.error("Error updating booking by ID:", err);
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


exports.login = async (req, res) => {
  try {
    const { gmail, password } = req.body;
    const employee = await Employee.findOne({ gmail });
    if (!employee || employee.password !== password) { // Replace with proper password hashing
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ success: true, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

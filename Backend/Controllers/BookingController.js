import Booking from '../models/Booking.js';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { securityType, bookingDate, durationHours, amount } = req.body;
    const userId = req.user.id;

    const newBooking = new Booking({
      userId,
      securityType,
      bookingDate,
      durationHours,
      amount,
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking', error });
  }
};

// Get all bookings (admin or user-specific)
export const getAllBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ userId });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve bookings', error });
  }
};

// Get a single booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving booking', error });
  }
};

// Update a booking
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const { securityType, bookingDate, durationHours, amount, paymentStatus } = req.body;

    booking.securityType = securityType || booking.securityType;
    booking.bookingDate = bookingDate || booking.bookingDate;
    booking.durationHours = durationHours || booking.durationHours;
    booking.amount = amount || booking.amount;
    booking.paymentStatus = paymentStatus || booking.paymentStatus;

    await booking.save();
    res.status(200).json({ message: 'Booking updated', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error });
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error });
  }
};

// Search bookings by security type or date
export const searchBookings = async (req, res) => {
  try {
    const { securityType, bookingDate } = req.query;
    const userId = req.user.id;

    const filter = { userId };
    if (securityType) filter.securityType = securityType;
    if (bookingDate) filter.bookingDate = new Date(bookingDate);

    const bookings = await Booking.find(filter);
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Search failed', error });
  }
};

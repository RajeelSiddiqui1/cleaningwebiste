import Booking from "../models/Booking.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { serviceId, name, email, phone, address, date, time } = req.body;

    const newBooking = new Booking({
      user: userId,
      service: serviceId,
      name,
      email,
      phone,
      address,
      date,
      time,
      status: "Pending",
    });

    const savedBooking = await newBooking.save();
    
    // Populate service to return details
    await savedBooking.populate('service');
    
    res.status(201).json({ message: "Booking created successfully", booking: savedBooking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get bookings for the logged-in user
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ user: userId })
      .populate('service', 'title image charges')
      .sort({ createdAt: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all bookings (Admin only)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email role')
      .populate('service', 'title image charges')
      .sort({ createdAt: -1 });

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update booking status (Admin only)
export const updateBookingStatus = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body;

    if (!["Pending", "Confirmed", "Completed", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    )
      .populate('user', 'name email role')
      .populate('service', 'title image charges');

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking status updated", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

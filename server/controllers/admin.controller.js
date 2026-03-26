import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Service from "../models/Services.js";
import Contact from "../models/Contact.js";

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const totalServices = await Service.countDocuments();
    const totalUsers = await User.countDocuments({ role: "User" });
    const totalBookings = await Booking.countDocuments();
    const totalInquiries = await Contact.countDocuments();

    // Get recent activities (simplified)
    const recentBookings = await Booking.find()
      .populate("service", "title")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentInquiries = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalServices,
        totalUsers,
        totalBookings,
        totalInquiries,
      },
      recentActivities: [
        ...recentBookings.map(b => ({
          id: b._id,
          type: "booking",
          action: "New Booking",
          service: b.service?.title || "Cleaning",
          time: b.createdAt
        })),
        ...recentInquiries.map(c => ({
          id: c._id,
          type: "inquiry",
          action: "New Inquiry",
          service: c.subject,
          time: c.createdAt
        }))
      ].sort((a, b) => b.time - a.time).slice(0, 5)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get all users with role 'User'
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "User" }).select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

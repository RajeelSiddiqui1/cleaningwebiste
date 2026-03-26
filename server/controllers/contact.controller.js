import Contact from "../models/Contact.js";

// Submit contact form (Public/Auth)
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Check if user is authenticated (using optional middleware logic, or manual extraction if we decide)
    // For simplicity, we'll try to get it from req.user if present
    const userId = req.user ? req.user.id : null;

    const newContact = new Contact({
      user: userId,
      name,
      email,
      subject,
      message,
    });

    const savedContact = await newContact.save();
    res.status(201).json({ message: "Contact request submitted successfully", contact: savedContact });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get contacts for logged-in user (Auth)
export const getUserContacts = async (req, res) => {
  try {
    const userId = req.user.id;
    const userEmail = req.user.email;
    
    // First try to get contacts by user ID, then also get by email
    const contacts = await Contact.find({
      $or: [
        { user: userId },
        { email: userEmail }
      ]
    }).sort({ createdAt: -1 });
    
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all contacts (Admin)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update contact status (Admin)
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "In Progress", "Resolved", "Archived"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact status updated", contact });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

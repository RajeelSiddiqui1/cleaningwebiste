import Testimonial from "../models/Testimonial.js";
import fs from "fs";
import path from "path";

// Get active testimonials (Public)
export const getActiveTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ testimonials });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all testimonials (Admin)
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({ testimonials });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create testimonial (Admin)
export const createTestimonial = async (req, res) => {
  try {
    const { name, role, text, isActive } = req.body;
    const image = req.file ? req.file.filename : "";

    const newTestimonial = new Testimonial({
      name,
      role,
      text,
      image,
      isActive: isActive === true || isActive === 'true',
    });

    const savedTestimonial = await newTestimonial.save();
    res.status(201).json({ message: "Testimonial created", testimonial: savedTestimonial });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update testimonial (Admin)
export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, text, isActive } = req.body;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    if (req.file) {
      if (testimonial.image) {
        const oldImagePath = path.join("uploads", testimonial.image);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      testimonial.image = req.file.filename;
    }

    testimonial.name = name || testimonial.name;
    testimonial.role = role || testimonial.role;
    testimonial.text = text || testimonial.text;
    
    if (isActive !== undefined) {
      testimonial.isActive = isActive === true || isActive === 'true';
    }

    const updatedTestimonial = await testimonial.save();
    res.status(200).json({ message: "Testimonial updated", testimonial: updatedTestimonial });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete testimonial (Admin)
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    if (testimonial.image) {
      const imagePath = path.join("uploads", testimonial.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await testimonial.deleteOne();
    res.status(200).json({ message: "Testimonial deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Toggle status (Admin)
export const toggleTestimonialStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    testimonial.isActive = !testimonial.isActive;
    const updatedTestimonial = await testimonial.save();

    res.status(200).json({ 
      message: `Testimonial ${updatedTestimonial.isActive ? "activated" : "deactivated"}`, 
      testimonial: updatedTestimonial 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

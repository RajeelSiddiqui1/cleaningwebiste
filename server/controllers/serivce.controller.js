import Service from "../models/Services.js";
import fs from "fs";
import path from "path";

const fetchServices = async (req, res) => {
  try {
    const services = await Service.find();
    if (!services || services.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }
    res.status(200).json({ services });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, points, charges } = req.body;

    const image = req.file ? req.file.filename : "";

    const newService = new Service({
      title,
      description,
      points,
      charges,
      image,
      userId,
    });

    const savedService = await newService.save();
    res.status(201).json({ message: "Service created", service: savedService });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const editService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const { title, description, points, charges } = req.body;

    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: "Service not found" });

    if (req.file) {
      if (service.image) {
        const oldImagePath = path.join("uploads", service.image);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      service.image = req.file.filename;
    }

    service.title = title || service.title;
    service.description = description || service.description;
    service.points = points || service.points;
    service.charges = charges || service.charges;

    const updatedService = await service.save();
    res.status(200).json({ message: "Service updated", service: updatedService });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: "Service not found" });

    if (service.image) {
      const imagePath = path.join("uploads", service.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await service.deleteOne();
    res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {fetchServices,createService,editService,deleteService}
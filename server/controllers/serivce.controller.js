import Service from "../models/Services.js";
import fs from "fs";
import path from "path";

const fetchServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true });

    if (!services || services.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }

    res.status(200).json({ services });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const fetchAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ services });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const fetchServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ service });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const fetchSepcialServices = async (req, res) => {
  try {
    const services = await Service.find({ specailService: true, isActive: true });
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
    const { title, description, points, charges, isActive, specailService } = req.body;

    // Handle points - could be array or comma-separated string
    let pointsArray = [];
    if (points) {
      if (Array.isArray(points)) {
        pointsArray = points;
      } else if (typeof points === 'string') {
        pointsArray = points.split(',').map(p => p.trim());
      }
    }

    const image = req.file ? req.file.filename : "";

    const newService = new Service({
      title,
      description,
      points: pointsArray,
      charges,
      image,
      isActive: isActive === true || isActive === 'true',
      specailService: specailService === true || specailService === 'true',
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
    const { title, description, points, charges, isActive, specailService } = req.body;

    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: "Service not found" });

    if (req.file) {
      if (service.image) {
        const oldImagePath = path.join("uploads", service.image);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      service.image = req.file.filename;
    }

    // Update fields
    service.title = title || service.title;
    service.description = description || service.description;
    
    // Handle points
    if (points) {
      if (Array.isArray(points)) {
        service.points = points;
      } else if (typeof points === 'string') {
        service.points = points.split(',').map(p => p.trim());
      }
    }
    
    service.charges = charges || service.charges;
    
    // Handle boolean fields
    if (isActive !== undefined) {
      service.isActive = isActive === true || isActive === 'true';
    }
    if (specailService !== undefined) {
      service.specailService = specailService === true || specailService === 'true';
    }

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

const toggleServiceStatus = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: "Service not found" });

    service.isActive = !service.isActive;
    const updatedService = await service.save();

    res.status(200).json({ 
      message: `Service ${updatedService.isActive ? "activated" : "deactivated"}`, 
      service: updatedService 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { fetchServices, fetchServiceById, fetchAllServices, fetchSepcialServices, createService, editService, deleteService, toggleServiceStatus };
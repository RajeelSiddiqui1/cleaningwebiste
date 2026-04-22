import mongoose from "mongoose";
import dotenv from "dotenv";
import dbConnect from "../lib/db.js";
import Service from "../models/Services.js";

dotenv.config();

const userId = "69bee7d7971d846200f66c64";

const servicesData = [
  // Residential Cleaning
  {
    title: "House cleaning",
    description: "Professional house cleaning service to keep your living space pristine and healthy.",
    points: ["Dusting all surfaces", "Vacuuming and mopping floors", "Sanitizing bathrooms and kitchen"],
    image: "house_cleaning.png",
    specailService: false,
    userId: userId,
  },
  {
    title: "Deep cleaning",
    description: "An intensive cleaning service that goes beyond the surface to eliminate hidden dirt and allergens.",
    points: ["Cleaning behind appliances", "Detailed baseboard scrubbing", "Sanitizing high-touch areas"],
    image: "deep_cleaning.png",
    specailService: false,
    userId: userId,
  },
  {
    title: "Move-in / move-out cleaning",
    description: "Stress-free cleaning for your transitions, ensuring a fresh start in your new home or a perfect exit.",
    points: ["Interior cabinet cleaning", "Wall spot cleaning", "Full appliance detailing"],
    image: "house_cleaning.png",
    specailService: false,
    userId: userId,
  },
  {
    title: "Apartment & condo cleaning",
    description: "Specialized cleaning tailored for compact living spaces, focusing on efficiency and thoroughness.",
    points: ["Balcony/patio cleaning", "Glass surface polishing", "Trash removal and recycling"],
    image: "house_cleaning.png",
    specailService: false,
    userId: userId,
  },
  // Commercial Cleaning
  {
    title: "Office cleaning",
    description: "Maintain a professional and productive work environment with our regular office cleaning.",
    points: ["Desk and workstation sanitization", "Breakroom deep cleaning", "Lobby and reception detailing"],
    image: "office_cleaning.png",
    specailService: false,
    userId: userId,
  },
  {
    title: "Retail store cleaning",
    description: "Keep your retail space inviting for customers with sparkling floors and dust-free displays.",
    points: ["Floor buffing and polishing", "Display shelf dusting", "Window and mirror cleaning"],
    image: "office_cleaning.png",
    specailService: false,
    userId: userId,
  },
  {
    title: "Restaurant cleaning",
    description: "Specialized sanitation services to meet health standards and ensure a clean dining experience.",
    points: ["Kitchen hood and grill cleaning", "Dining area sanitization", "Floor degreasing and mopping"],
    image: "office_cleaning.png",
    specailService: false,
    userId: userId,
  },
  {
    title: "Common area/building cleaning",
    description: "Consistent maintenance for shared spaces in residential or commercial buildings.",
    points: ["Hallway and stairwell cleaning", "Elevator cabin sanitization", "Entrance area maintenance"],
    image: "office_cleaning.png",
    specailService: false,
    userId: userId,
  },
  // Other Services
  {
    title: "Floor scrubbing & polishing",
    description: "Expert floor care to restore the shine and longevity of your hardwood, tile, or stone floors.",
    points: ["Deep machine scrubbing", "Professional buffing", "Protective sealant application"],
    image: "power_washing.png",
    specailService: false,
    userId: userId,
  },
  {
    title: "Post-construction cleaning",
    description: "Detailed cleaning to remove dust and debris after renovation or new construction.",
    points: ["Removing fine drywall dust", "Paint and adhesive removal", "Final surface polishing"],
    image: "deep_cleaning.png",
    specailService: false,
    userId: userId,
  },
  // Kitchen & Installation
  {
    title: "Kitchen deep cleaning",
    description: "Complete sanitation of your kitchen area, focusing on grease-heavy surfaces and appliances.",
    points: ["Stove and range hood degreasing", "Sink and countertop sanitizing", "Floor deep mopping"],
    image: "deep_cleaning.png",
    specailService: false,
    userId: userId,
  },
  {
    title: "Appliance cleaning (oven, fridge, etc.)",
    description: "Thorough cleaning of all kitchen appliances to ensure hygiene and peak performance.",
    points: ["Microwave interior cleaning", "Dishwasher exterior polish", "Range top detailing"],
    image: "deep_cleaning.png",
    specailService: false,
    userId: userId,
  },
  {
    title: "Kitchen installation services",
    description: "Professional assembly and installation of kitchen cabinets, countertops, and appliances.",
    points: ["Cabinet mounting and leveling", "Countertop fitting", "Appliance integration"],
    image: "deep_cleaning.png",
    specailService: false,
    userId: userId,
  },
  // Optional Add-ons
  {
    title: "Fridge & oven deep cleaning",
    description: "Restore your appliances to like-new condition with our deep grease and grime removal.",
    points: ["Degreasing oven interiors", "Sanitizing fridge shelves", "Removing stubborn food stains"],
    image: "deep_cleaning.png",
    specailService: false,
    userId: userId,
  },
  {
    title: "Cabinet interior cleaning",
    description: "Detailed cleaning and organization of your cabinets and drawers for a clutter-free kitchen.",
    points: ["Removing shelf liners", "Wiping down all interiors", "Reorganizing items neatly"],
    image: "deep_cleaning.png",
    specailService: false,
    userId: userId,
  },
  {
    title: "Laundry & ironing service",
    description: "Professional care for your clothes, from washing and drying to perfect ironing.",
    points: ["Sorting by fabric type", "Gentle washing cycles", "Crisp and neat ironing"],
    image: "house_cleaning.png",
    specailService: false,
    userId: userId,
  },
  {
    title: "Full basement kit only cleaning",
    description: "Comprehensive basement cleaning including washrooms, dry walls, and framing work preparation.",
    points: ["Dusting framing and drywalls", "Sanitizing basement washrooms", "Floor debris removal"],
    image: "house_cleaning.png",
    specailService: false,
    userId: userId,
  },
  // Specialized Services (specailService: true)
  {
    title: "Carpet cleaning",
    description: "Revitalize your carpets with our deep steam cleaning and stain removal process.",
    points: ["Deep steam extraction", "Spot and stain treatment", "Fiber protection"],
    image: "carpet_cleaning.png",
    specailService: true,
    userId: userId,
  },
  {
    title: "Upholstery (sofa & chair) cleaning",
    description: "Revitalize your furniture with deep fabric cleaning and stain removal.",
    points: ["Deep steam cleaning", "Fabric stain treatment", "Deodorizing upholstery"],
    image: "deep_cleaning.png",
    specailService: true,
    userId: userId,
  },
  {
    title: "Window cleaning (interior & exterior)",
    description: "Crystal clear views with our professional streak-free window cleaning service.",
    points: ["Sills and tracks cleaning", "Exterior glass washing", "Interior glass polishing"],
    image: "window_cleaning.png",
    specailService: true,
    userId: userId,
  },
  {
    title: "Power washing",
    description: "High-pressure cleaning for driveways, patios, and exterior walls to remove tough stains.",
    points: ["Driveway oil stain removal", "Patio moss and algae cleaning", "Exterior wall grime removal"],
    image: "power_washing.png",
    specailService: true,
    userId: userId,
  },
];

const seedDB = async () => {
  await dbConnect();
  try {
    // The user said they deleted everything, but let's be safe and clear again 
    // to avoid duplicates if they didn't actually delete all entries.
    await Service.deleteMany({ userId: userId });
    console.log("Existing services for this user cleared.");
    
    await Service.insertMany(servicesData);
    console.log("Database re-seeded successfully with updated services!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, User, Mail, Phone, ArrowLeft, Loader2, Info } from "lucide-react";
import { serviceAPI, bookingAPI, IMAGE_BASE_URL, isAuthenticated } from "../lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const BookNow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    // Force user to login
    if (!isAuthenticated()) {
      alert("Please login to book a service");
      navigate("/login");
      return;
    }

    const fetchServiceDetails = async () => {
      try {
        const result = await serviceAPI.getById(id);
        if (result.ok && result.data.service) {
          setService(result.data.service);
        } else {
          alert("Service not found");
          navigate("/services");
        }
      } catch (error) {
        console.error("Error fetching service:", error);
        alert("Error loading service details");
        navigate("/services");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const result = await bookingAPI.create({
        ...formData,
        serviceId: id
      });

      if (result.ok) {
        alert("Booking successful! You can view the status in your Profile.");
        navigate("/profile");
      } else {
        alert(result.data.message || "Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to submit booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 section-padding bg-background min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <motion.div 
          initial="hidden" 
          animate="visible" 
          className="grid lg:grid-cols-5 gap-8 lg:gap-12"
        >
          {/* Form Section */}
          <div className="lg:col-span-3">
            <h1 className="font-heading text-4xl font-bold mb-2">Book Your Service</h1>
            <p className="text-muted-foreground mb-8 text-sm">Fill in the details below to schedule your cleaning session.</p>

            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-heading text-xl font-bold mb-6 border-b border-border pb-4">Personal Details</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-foreground">
                    <User size={16} className="text-primary"/> Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-foreground">
                    <Mail size={16} className="text-primary"/> Email Context
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-foreground">
                    <Phone size={16} className="text-primary"/> Contact Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="+1 234 567 890"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-foreground">
                    <MapPin size={16} className="text-primary"/> Target Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="123 Corporate Blvd"
                  />
                </div>
              </div>

              <h3 className="font-heading text-xl font-bold mb-6 border-b border-border pb-4">Scheduling Details</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-foreground">
                    <Calendar size={16} className="text-primary"/> Select Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-foreground">
                    <Clock size={16} className="text-primary"/> Preferred Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full btn-primary py-4 justify-center text-base"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={20} className="animate-spin" /> Confirming...
                  </span>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </form>
          </div>

          {/* Service Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-28 bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
              <div className="h-48 relative">
                {service?.image ? (
                  <img src={`${IMAGE_BASE_URL}/${service.image}`} alt={service.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground font-semibold">No Image Preview</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2 inline-block shadow-lg">
                    Selected Service
                  </span>
                  <h3 className="font-heading text-2xl font-bold leading-tight">{service?.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start gap-3 mb-6 p-4 bg-muted/50 rounded-xl">
                  <Info size={20} className="text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {service?.description}
                  </p>
                </div>

                {service?.charges && (
                  <div className="flex items-center justify-between border-t border-border pt-6">
                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                      Estimated Cost
                    </span>
                    <span className="font-heading text-xl font-bold text-primary">
                      {service.charges}
                    </span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Final pricing may vary based on specific site requirements.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookNow;

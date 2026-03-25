import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Home, 
  Building2, 
  Factory, 
  Sparkles, 
  Wind, 
  Droplets,
  Loader2,
  X,
  CheckCircle2,
  Info
} from "lucide-react";
import { serviceAPI, IMAGE_BASE_URL } from "../lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const iconMap = {
  "Residential Cleaning": Home,
  "Corporate Maintenance": Building2,
  "Industrial Grade Cleaning": Factory,
  "Specialized Deep Clean": Sparkles,
  "Eco-Window Refinement": Wind,
  "Textile & Carpet Spa": Droplets,
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await serviceAPI.getAll();
        if (result.ok) {
          // Fetch all active services
          const activeServices = result.data.services.filter(s => s.isActive);
          // Sort Special Services first
          const sortedServices = [...activeServices].sort((a, b) => {
            if (a.specailService && !b.specailService) return -1;
            if (!a.specailService && b.specailService) return 1;
            return 0;
          });
          setServices(sortedServices);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const getIcon = (title) => {
    return iconMap[title] || Sparkles;
  };

  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/assets/service-office.jpg"
            alt="Express Cleaning Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/40" />
        </div>
        <div className="relative container mx-auto px-4 md:px-8 pt-20">
          <motion.div initial="hidden" animate="visible" className="max-w-2xl">
            <motion.p variants={fadeUp} custom={0} className="section-subtitle mb-4">
              ✦ Our Services
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-heading text-5xl md:text-6xl font-bold text-dark-foreground leading-tight mb-6"
            >
              Professional <span className="text-primary">Cleaning</span>{" "}
              Solutions For Every Need
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-dark-foreground/70 text-lg mb-10 max-w-lg"
            >
              Whether it's your private residence, corporate office, or exclusive specialty needs — we provide definitive hygiene solutions with uncompromising quality.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">
                Get A Quote <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Services Grid ─── */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground animate-pulse">Refining your experience...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-20">
              <Sparkles className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No Services Found</h3>
              <p className="text-muted-foreground">We're currently updating our service catalog.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, i) => {
                const Icon = getIcon(service.title);
                return (
                  <motion.div
                    key={service._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer"
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="relative overflow-hidden h-60">
                      {service.image ? (
                        <img
                          src={`${IMAGE_BASE_URL}/${service.image}`}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <Icon size={48} className="text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                      <div className="absolute top-4 left-4 w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                        <Icon size={22} className="text-primary-foreground" />
                      </div>

                      {service.specailService && (
                        <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
                          Special Edition
                        </div>
                      )}
                    </div>
                    <div className="p-8">
                      <h3 className="font-heading text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-6 leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <button className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider group/btn">
                          View Details 
                          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                        {service.charges && (
                          <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
                            Starting {service.charges}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ─── Detail Modal ─── */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-dark/20 hover:bg-dark/40 text-white rounded-full transition-all backdrop-blur-md"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto md:overflow-hidden">
                {/* Modal Visual */}
                <div className="md:w-1/2 h-64 md:h-auto relative">
                  {selectedService.image ? (
                    <img
                      src={`${IMAGE_BASE_URL}/${selectedService.image}`}
                      alt={selectedService.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                      <Sparkles size={80} className="text-primary/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-dark/60 via-transparent to-transparent" />
                </div>

                {/* Modal Content */}
                <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      {selectedService.specailService ? "Exclusive Package" : "Premium Service"}
                    </span>
                    {selectedService.charges && (
                      <span className="text-muted-foreground text-xs font-medium">
                        ✦ {selectedService.charges}
                      </span>
                    )}
                  </div>
                  
                  <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-foreground">
                    {selectedService.title}
                  </h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="flex items-center gap-2 font-bold mb-3 text-sm uppercase tracking-widest text-primary">
                        <Info size={16} /> Overview
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedService.description}
                      </p>
                    </div>

                    {selectedService.points && selectedService.points.length > 0 && (
                      <div>
                        <h4 className="flex items-center gap-2 font-bold mb-4 text-sm uppercase tracking-widest text-primary">
                          <CheckCircle2 size={16} /> Key Features
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          {selectedService.points.map((point, index) => (
                            <motion.div 
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl"
                            >
                              <div className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0" />
                              <span className="text-foreground text-sm font-medium">{point}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-6 border-t border-border flex flex-col gap-4">
                      <Link 
                        to={`/book/${selectedService._id}`}
                        className="w-full btn-primary text-center justify-center py-4"
                        onClick={() => setSelectedService(null)}
                      >
                        Book This Service <ArrowRight size={18} />
                      </Link>
                      <p className="text-center text-xs text-muted-foreground">
                        Customized quotes available based on space and requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── CTA ─── */}
      <section className="section-padding bg-primary text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-dark/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="container mx-auto max-w-2xl relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Bespoke Solutions for Discerning Clients
          </h2>
          <p className="text-primary-foreground/80 mb-10 text-lg">
            Consult with our specialists today and experience the pinnacle of professional maintenance.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-dark text-dark-foreground px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:brightness-125 transition-all shadow-xl"
          >
            Get A Personalized Quote <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;

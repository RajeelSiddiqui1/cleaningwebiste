import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Building2, Factory, Sparkles, Wind, Droplets } from "lucide-react";

// Local images from public/assets/
const heroImg = "/assets/service-office.jpg";
const serviceHome = "/assets/service-home.jpg";
const serviceOffice = "/assets/service-office.jpg";
const serviceCommercial = "/assets/service-commercial.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const services = [
  {
    icon: Home,
    title: "Residential Cleaning",
    desc: "Bespoke housekeeping and deep cleaning services tailored to keep your sanctuary pristine and welcoming.",
    img: serviceHome,
    features: ["Bespoke Daily Care", "Full-Spectrum Deep Clean", "Gourmet Kitchen Sanitization", "Luxury Restroom Polish"],
  },
  {
    icon: Building2,
    title: "Corporate Maintenance",
    desc: "Elevate workplace productivity with our sophisticated commercial maintenance and sanitation solutions.",
    img: serviceOffice,
    features: ["Executive Suite Care", "Precision Floor Refinement", "Corporate Restroom Hygiene", "Crystal-Clear Window Care"],
  },
  {
    icon: Factory,
    title: "Industrial Grade Cleaning",
    desc: "Rugged yet precise cleaning solutions for complex retail, industrial, and high-volume commercial assets.",
    img: serviceCommercial,
    features: ["Warehouse Logistics Care", "Retail Boutique Sanitation", "Culinary Grade Maintenance", "Post-Architecture Cleanup"],
  },
  {
    icon: Sparkles,
    title: "Specialized Deep Clean",
    desc: "Intensive restoration services that revitalize every surface. Ideal for momentous transitions and events.",
    img: serviceHome,
    features: ["Luxe Carpet Restoration", "Textile & Upholstery Care", "High-End Appliance Polish", "Surgical Grade Sanitization"],
  },
  {
    icon: Wind,
    title: "Eco-Window Refinement",
    desc: "Achieve crystal-clear transparency with our eco-conscious window refinement and polishing services.",
    img: serviceOffice,
    features: ["Streak-Free Precision", "Exterior Shielding", "Interior Frame Hygiene", "Bespoke Glass Polish"],
  },
  {
    icon: Droplets,
    title: "Textile & Carpet Spa",
    desc: "Our advanced extraction technology restores the luxurious texture and vibrance of your carpets and upholstery.",
    img: serviceCommercial,
    features: ["Deep Thermal Extraction", "Eco-Friendly De-Staining", "Odor Neutralization", "Fabric Softening Care"],
  },
];

const Services = () => {
  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[100vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImg}
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
              Whether it's your private residence, corporate office, or commercial asset — we provide definitive hygiene solutions.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">
                Get A Quote <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-outline-light">
                Special Package
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Services Grid ─── */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl overflow-hidden border border-border hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
              >
                <div className="relative overflow-hidden h-52">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <service.icon size={22} className="text-primary-foreground" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{service.desc}</p>
                  <ul className="flex flex-col gap-2 mb-4">
                    {service.features.map((f, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Special Package ─── */}
      <section className="section-padding bg-dark text-dark-foreground">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-subtitle mb-3">✦ Special Package</p>
            <h2 className="section-title">
              Microwave, Oven &amp; Gas Stove <span className="text-primary">Deep Clean</span>
            </h2>
            <p className="text-dark-foreground/60 mt-4 text-base leading-relaxed">
              Exquisite restoration of your kitchen assets — summarized in one elite package.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                emoji: "📦",
                name: "Microwave Oven",
                items: ["Interior deep clean", "Turntable & tray wash", "Door & seal sanitize", "Exterior polish"],
              },
              {
                emoji: "🔥",
                name: "Baking Oven",
                items: ["Rack & tray degreasing", "Interior wall scrub", "Glass door clean", "Exterior wipe-down"],
              },
              {
                emoji: "🍳",
                name: "Gas Stove / Hob",
                items: ["Burner head cleaning", "Drip pan degreasing", "Surface scrub & polish", "Knob sanitization"],
              },
            ].map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-dark-section rounded-2xl p-8 border border-dark-foreground/10 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="text-5xl mb-5">{pkg.emoji}</div>
                <h3 className="font-heading text-xl font-bold mb-4 text-dark-foreground">{pkg.name}</h3>
                <ul className="flex flex-col gap-3">
                  {pkg.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-dark-foreground/70">
                      <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <span className="w-2 h-2 rounded-full bg-primary block" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Package Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary/10 border border-primary/30 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <p className="text-primary font-heading font-bold text-sm uppercase tracking-widest mb-2">Exclusive Bundle</p>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-dark-foreground">
                Three Essential Appliances — One Bespoke Price
              </h3>
              <p className="text-dark-foreground/60 mt-2 text-sm">
                Microwave + Baking Oven + Gas Stove. Immaculate cleaning from the inside out. Schedule your session today.
              </p>
            </div>
            <Link to="/contact" className="btn-primary shrink-0">
              Book Package <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-padding bg-primary text-primary-foreground text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Bespoke Solutions for Discerning Clients
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Consult with our specialists today and experience the pinnacle of professional maintenance.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-dark text-dark-foreground px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wider hover:brightness-125 transition-all"
          >
            Get A Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;

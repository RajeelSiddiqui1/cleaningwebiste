import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { contactAPI } from "../lib/api";

// Local image from public/assets/
const heroImg = "/assets/hero-cleaning.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Map form data to Backend Schema (name, email, subject, message)
    // We attach phone directly inside the message payload
    const payload = {
      name: formData.name,
      email: formData.email,
      subject: formData.service || "General Inquiry",
      message: `Phone: ${formData.phone || "Not Provided"}\n\n${formData.message}`
    };

    try {
      const result = await contactAPI.submit(payload);
      if (result.ok) {
        alert("Thank you for your message. An Express specialist will contact you shortly to discuss your requirements.");
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        alert("There was an issue submitting your request. Please try again.");
      }
    } catch (error) {
      console.error("Contact submission failed", error);
      alert("Submission error, please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[100vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Contact Express Cleaning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/40" />
        </div>
        <div className="relative container mx-auto px-4 md:px-8 pt-20">
          <motion.div initial="hidden" animate="visible" className="max-w-2xl">
            <motion.p variants={fadeUp} custom={0} className="section-subtitle mb-4">
              ✦ Contact Us
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-heading text-5xl md:text-6xl font-bold text-dark-foreground leading-tight mb-6"
            >
              Let's Start a <span className="text-primary">Conversation</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-dark-foreground/70 text-lg mb-10 max-w-lg"
            >
              Whether you have an inquiry or require a tailored consultation — our directors are available 24/7.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <a href="tel:4168044646" className="btn-primary">
                <Phone size={16} /> Call Now
              </a>
              <a href="mailto:info@expressclean.com" className="btn-outline-light">
                Email Us
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Contact Info + Form ─── */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold mb-6">Get In Touch</h2>
              <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                Should you have any inquiries or wish to request a bespoke quote, our dedicated team is available 24/7 to assist you.
              </p>
              <div className="flex flex-col gap-6">
                {[
                  { icon: Phone, label: "Phone", value: "416 804 4646" },
                  { icon: Mail, label: "Email", value: "info@expressclean.com" },
                  { icon: MapPin, label: "Address", value: "76 birkdale road , Scarborough, M1P3R5" },
                  { icon: Clock, label: "Working Hours", value: "Mon - Sat: 8:00 AM - 8:00 PM" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                      <p className="font-medium text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-secondary rounded-2xl p-8">
                <h3 className="font-heading text-xl font-bold mb-6">Request Your Bespoke Quote</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-muted-foreground"
                    >
                      <option value="">Select Required Service</option>
                      <option>Home Cleaning</option>
                      <option>Office Cleaning</option>
                      <option>Commercial Cleaning</option>
                      <option>Deep Cleaning</option>
                      <option>Window Cleaning</option>
                      <option>Carpet Cleaning</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Your Detailed Inquiry"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="px-4 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                  />
                  <button type="submit" disabled={submitting} className={`btn-primary w-fit ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                    {submitting ? (
                      <>Processing <Loader2 size={16} className="animate-spin" /></>
                    ) : (
                      <>Send Message <Send size={16} /></>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Map Placeholder ─── */}
      <section className="h-80 bg-muted flex items-center justify-center">
        <div className="text-center">
          <MapPin size={48} className="text-primary mx-auto mb-4" />
          <p className="font-heading font-semibold text-lg">76 birkdale road , Scarborough, M1P3R5</p>
          <p className="text-muted-foreground text-sm">Interactive Google Map integration available upon request.</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;

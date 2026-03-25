import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Leaf, Award, Star, Phone, CheckCircle, Sparkles, ChevronLeft, ChevronRight, User } from "lucide-react";
import { testimonialAPI, IMAGE_BASE_URL } from "../lib/api";

// Local images from public/assets/
const heroImg = "/assets/hero-cleaning.jpg";
const aboutImg = "/assets/about-cleaning.jpg";
const serviceOffice = "/assets/service-office.jpg";
const serviceHome = "/assets/service-home.jpg";
const serviceCommercial = "/assets/service-commercial.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const Index = () => {

  const services = [
    {
      title: "Home Cleaning",
      desc: "From regular housekeeping to deep cleaning, we ensure your home is always welcoming.",
      img: serviceHome,
    },
    {
      title: "Office Cleaning",
      desc: "Keep your workplace clean and productive with our professional office cleaning.",
      img: serviceOffice,
    },
    {
      title: "Commercial Cleaning",
      desc: "Comprehensive cleaning solutions for retail, industrial and commercial spaces.",
      img: serviceCommercial,
    },
  ];

  const stats = [
    { num: "10K+", label: "Happy Clients" },
    { num: "15+", label: "Years Experience" },
    { num: "50+", label: "Team Members" },
    { num: "98%", label: "Satisfaction Rate" },
  ];

  const [testimonials, setTestimonials] = useState([]);
  
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const result = await testimonialAPI.getActive();
        if (result.ok) {
          setTestimonials(result.data.testimonials);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      }
    };
    fetchTestimonials();
  }, []);

  const slideLeft = () => {
    const slider = document.getElementById("testimonial-slider");
    if (slider) slider.scrollBy({ left: -400, behavior: "smooth" });
  };

  const slideRight = () => {
    const slider = document.getElementById("testimonial-slider");
    if (slider) slider.scrollBy({ left: 400, behavior: "smooth" });
  };

  const faqs = [
    {
      q: "What types of spaces do you specialize in?",
      a: "We specialize in residential homes, corporate offices, retail environments, and post-construction deep cleaning.",
    },
    {
      q: "Do you use eco-sustainable cleaning products?",
      a: "Yes, we utilize premium, eco-friendly, and non-toxic cleaning agents that are safe for both families and the environment.",
    },
    {
      q: "How can I schedule a professional cleaning session?",
      a: "You can easily book a consultation through our website or by contacting our dedicated support line for immediate assistance.",
    },
    {
      q: "What is your satisfaction guarantee policy?",
      a: "We offer a 100% satisfaction guarantee. If our service does not meet your expectations, we will rectify it immediately at no additional cost.",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Express Residential & Commercial Cleaning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/40" />
        </div>
        <div className="relative container mx-auto px-4 md:px-8 pt-20">
          <motion.div initial="hidden" animate="visible" className="max-w-2xl">
            <motion.p variants={fadeUp} custom={0} className="section-subtitle mb-4">
              ✦ Express Residential & Commercial Cleaning
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-dark-foreground leading-tight mb-6"
            >
              Clean <span className="text-primary">Space</span> Starts{" "}
              <span className="text-primary">Here</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-dark-foreground/70 text-lg mb-10 max-w-lg"
            >
              Professional cleaning services for offices, homes, and commercial spaces – done right,
              every time.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Link to="/services" className="btn-primary">
                Our Services <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-outline-light">
                Get A Quote
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Marquee ─── */}
      <div className="bg-primary py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="text-primary-foreground font-heading text-lg font-semibold mx-8 flex items-center gap-3"
            >
              <Sparkles size={16} /> Vacuum{" "}
              <span className="opacity-50">•</span> Cleaning{" "}
              <span className="opacity-50">•</span> Sweeping{" "}
              <span className="opacity-50">•</span> Sanitization
            </span>
          ))}
        </div>
      </div>

      {/* ─── About Section ─── */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <img
                  src={aboutImg}
                  alt="About Express"
                  className="rounded-2xl w-full max-w-md mx-auto"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl">
                  <p className="font-heading text-3xl font-bold">15+</p>
                  <p className="text-sm opacity-80">Years Experience</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="section-subtitle mb-3">About Express</p>
              <h2 className="section-title mb-6">We Offer A Wide Range Of Cleaning Services</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Express is committed to delivering excellence in every cleaning project. Our elite team utilizes advanced techniques and eco-certified products to ensure your environment is not only spotless but also hygienically superior.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Residential Cleaning",
                  "Commercial Cleaning",
                  "Deep Cleaning",
                  "Eco-Friendly Products",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-primary shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-primary">
                Learn More <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section className="section-padding bg-dark text-dark-foreground">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="section-subtitle mb-3">Why Choose Express</p>
            <h2 className="section-title">The Perfect Solution For Your Space</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Industry Excellence",
                desc: "Over 15 years of expertise in industrial and residential maintenance with a 98% client retention rate.",
              },
              {
                icon: Shield,
                title: "Premium Standards",
                desc: "We utilize cutting-edge equipment and rigorous quality control to eliminate deep-seated pollutants and stains.",
              },
              {
                icon: Leaf,
                title: "Eco-Conscious Care",
                desc: "Our high-performance cleaning solutions are non-toxic, sustainable, and safe for all occupants and the planet.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-dark-section rounded-2xl p-8 border border-dark-foreground/10 hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <item.icon
                    size={24}
                    className="text-primary group-hover:text-primary-foreground transition-colors duration-300"
                  />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-dark-foreground/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

   
      {/* ─── Stats + CTA ─── */}
      <section className="section-padding bg-dark text-dark-foreground">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className="section-subtitle mb-3">Our Trusted Partners</p>
              <h2 className="section-title mb-6">Smart Cleaning Solution 24/7</h2>
              <p className="text-dark-foreground/60 mb-8">
                Our unwavering commitment to quality ensures a superior cleaning experience. We pride ourselves on the trust we've built through consistent, elite performance and personalized care.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary">
                  Contact Us <ArrowRight size={16} />
                </Link>
                <a href="tel:+923001234567" className="flex items-center gap-3 text-dark-foreground">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-dark-foreground/50">Need Help?</p>
                    <p className="font-semibold text-sm">+92 300 1234567</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-dark-section rounded-2xl p-6 text-center border border-dark-foreground/10"
                >
                  <p className="font-heading text-3xl md:text-4xl font-bold text-primary mb-1">
                    {stat.num}
                  </p>
                  <p className="text-dark-foreground/60 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="section-padding overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <p className="section-subtitle mb-3">What Clients Say</p>
              <h2 className="section-title">Hear From Our Happy Clients</h2>
            </div>
            {testimonials.length > 3 && (
              <div className="flex items-center gap-3">
                <button onClick={slideLeft} className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={slideRight} className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
          
          {testimonials.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground italic">No reviews available at the moment.</p>
            </div>
          ) : (
            <div 
              id="testimonial-slider"
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={t._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-secondary rounded-2xl p-8 min-w-[320px] md:min-w-[400px] snap-center flex flex-col justify-between shrink-0"
                >
                  <div>
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={16} className="text-primary fill-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-8 italic">"{t.text}"</p>
                  </div>
                  <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden shrink-0">
                      {t.image ? (
                        <img src={`${IMAGE_BASE_URL}/${t.image}`} className="w-full h-full object-cover" alt={t.name}/>
                      ) : (
                        <User size={18} className="text-primary"/>
                      )}
                    </div>
                    <div>
                      <p className="font-heading font-bold text-sm text-foreground">{t.name}</p>
                      <p className="text-muted-foreground text-xs uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

     

    
      <section className="section-padding bg-primary text-primary-foreground text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready for a Spotless Space?
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Elevate your environment with our bespoke cleaning solutions today.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-dark text-dark-foreground px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wider hover:brightness-125 transition-all"
          >
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;

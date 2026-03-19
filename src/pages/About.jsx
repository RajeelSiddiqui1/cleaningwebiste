import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Target, Eye, Award, Users, Clock, Leaf } from "lucide-react";

// Local images from public/assets/
const heroImg = "/assets/about-cleaning.jpg";
const aboutImg = "/assets/about-cleaning.jpg";
const teamImg = "/assets/team-photo.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const About = () => {
  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[100vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="About Express Cleaning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/40" />
        </div>
        <div className="relative container mx-auto px-4 md:px-8 pt-20">
          <motion.div initial="hidden" animate="visible" className="max-w-2xl">
            <motion.p variants={fadeUp} custom={0} className="section-subtitle mb-4">
              ✦ About Express
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-heading text-5xl md:text-6xl font-bold text-dark-foreground leading-tight mb-6"
            >
              The Gold Standard in <span className="text-primary">Professional</span> Hygiene
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-dark-foreground/70 text-lg mb-10 max-w-lg"
            >
              A legacy of over 15 years, powered by 50+ certified specialists and a 100% satisfaction guarantee.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">
                Get A Quote <ArrowRight size={16} />
              </Link>
              <Link to="/services" className="btn-outline-light">
                Our Services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Story ─── */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={aboutImg}
                alt="About Express Cleaning"
                className="rounded-2xl w-full max-w-md mx-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="section-subtitle mb-3">Our Legacy</p>
              <h2 className="section-title mb-6">Over 15 Years of Unrivaled Expertise</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Founded in 2010, Express Residential & Commercial Cleaning began with a singular vision: to redefine cleaning standards through precision and passion. Today, we stand as industry leaders with a vast team of certified specialists serving clients across the region.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our mission is to provide an elite cleaning experience that transcends expectations. By integrating sustainable practices with modern technology, we create environments that are healthier, safer, and remarkably pristine.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Licensed & Insured",
                  "Trained Staff",
                  "24/7 Support",
                  "Affordable Rates",
                  "Eco-Friendly",
                  "Satisfaction Guaranteed",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-primary shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Mission & Vision ─── */}
      <section className="section-padding bg-dark text-dark-foreground">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-dark-section rounded-2xl p-8 border border-dark-foreground/10"
            >
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                <Target size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4">Hamara Mission</h3>
              <p className="text-dark-foreground/60 leading-relaxed">
                To empower our clients with a healthier lifestyle and workspace through meticulous, high-performance cleaning solutions. We aim to elevate well-being by crafting immaculate environments with unwavering integrity.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-dark-section rounded-2xl p-8 border border-dark-foreground/10"
            >
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                <Eye size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4">Hamara Vision</h3>
              <p className="text-dark-foreground/60 leading-relaxed">
                To be the definitive choice for premium cleaning services, recognized globally for our innovation, service excellence, and dedication to environmental sustainability.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="section-title">The Foundation of Our Excellence</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Excellence Driven", desc: "We never settle for anything less than perfection in every task." },
              { icon: Users, title: "Client Centric", desc: "Every client is the heartbeat of our operations." },
              { icon: Clock, title: "Absolute Punctuality", desc: "Our specialists respect your time through rigorous scheduling." },
              { icon: Leaf, title: "Sustainable Stewardship", desc: "A profoundly responsible approach to environmental safety." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-secondary"
              >
                <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Team Photo CTA ─── */}
      <section className="relative">
        <img
          src={teamImg}
          alt="Express Cleaning Team"
          className="w-full h-80 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-dark/70 flex items-center justify-center">
          <div className="text-center text-dark-foreground">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Meet Our Specialized Team
            </h2>
            <Link to="/team" className="btn-primary">
              View Team <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

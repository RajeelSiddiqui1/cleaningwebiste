import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

// Local image from public/assets/
const heroImg = "/assets/team-photo.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const teamMembers = [
  {
    name: "Ali Hassan",
    role: "Founder & CEO",
    bio: "With over 15 years of visionary leadership, Ali has pioneered new standards in luxury maintenance and service excellence.",
  },
  {
    name: "Fatima Zahra",
    role: "Chief of Operations",
    bio: "Fatima masterfully orchestrates our complex projects, ensuring seamless execution and flawless delivery for every client.",
  },
  {
    name: "Usman Ahmed",
    role: "Commercial Director",
    bio: "An expert in large-scale asset management, Usman specializes in delivering high-impact solutions for our corporate partners.",
  },
  {
    name: "Ayesha Khan",
    role: "Specialist Trainer",
    bio: "Ayesha ensures our elite standards are upheld through rigorous training and continuous quality performance audits.",
  },
  {
    name: "Bilal Raza",
    role: "Client Relations Lead",
    bio: "Dedicated to fostering long-term partnerships, Bilal ensures that every client interaction is handled with ultimate care.",
  },
  {
    name: "Hina Pervez",
    role: "Brand Strategist",
    bio: "Hina executes our sophisticated brand vision, connecting discerning clients with our premium suite of services.",
  },
];

const Team = () => {
  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[150vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Express Cleaning Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/40" />
        </div>
        <div className="relative container mx-auto px-4 md:px-8 pt-20">
          <motion.div initial="hidden" animate="visible" className="max-w-2xl">
            <motion.p variants={fadeUp} custom={0} className="section-subtitle mb-4">
              ✦ Our Team
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-heading text-5xl md:text-6xl font-bold text-dark-foreground leading-tight mb-6"
            >
              Meet Our <span className="text-primary">Artisans</span> of Cleanliness
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-dark-foreground/70 text-lg mb-10 max-w-lg"
            >
              A workforce of over 50+ trained professionals dedicated to perfecting your environment.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">
                Contact Us <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Team Grid ─── */}
      <section className="section-padding -mt-16 relative z-10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors duration-300">
                  <span className="font-heading text-2xl font-bold text-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-4">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{member.bio}</p>
                <div className="flex justify-center gap-3">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, j) => (
                    <a
                      key={j}
                      href="#"
                      className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-padding bg-primary text-primary-foreground text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Join the Express Elite Team
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Connect with us today for unmatched professional cleaning expertise.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-dark text-dark-foreground px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wider hover:brightness-125 transition-all"
          >
            Contact Us <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Team;

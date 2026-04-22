import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUp, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-dark text-dark-foreground">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                <span className="font-heading font-bold text-primary-foreground text-xl">E</span>
              </div>
              <div className="leading-tight">
                <span className="font-heading text-base font-bold block text-primary">Express</span>
                <span className="font-heading text-xs font-semibold block text-dark-foreground/70">Residential & Commercial Cleaning</span>
              </div>
            </div>
            <p className="text-dark-foreground/60 text-sm leading-relaxed mb-6">
              Professional cleaning services for offices, homes, and commercial spaces – done right, every time.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-dark-foreground/20 flex items-center justify-center text-dark-foreground/60 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-6">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {["Home", "Services", "About", "Team", "Contact"].map((name) => (
                <Link
                  key={name}
                  to={name === "Home" ? "/" : `/${name.toLowerCase()}`}
                  className="text-dark-foreground/60 text-sm hover:text-primary transition-colors"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-6">Our Services</h4>
            <div className="flex flex-col gap-3">
              {[
                "Home Cleaning",
                "Office Cleaning",
                "Commercial Cleaning",
                "Deep Cleaning",
                "Window Cleaning",
                "Carpet Cleaning",
              ].map((s) => (
                <Link
                  key={s}
                  to="/services"
                  className="text-dark-foreground/60 text-sm hover:text-primary transition-colors"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-bold mb-6">Contact Info</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-primary mt-1 shrink-0" />
                <span className="text-dark-foreground/60 text-sm">416 804 4646</span>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-primary mt-1 shrink-0" />
                <span className="text-dark-foreground/60 text-sm">info@expressclean.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-primary mt-1 shrink-0" />
                <span className="text-dark-foreground/60 text-sm">76 birkdale road , Scarborough, M1P3R5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-dark-foreground/10">
        <div className="container mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dark-foreground/40 text-sm">© 2026 Express Residential & Commercial Cleaning. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:brightness-110 transition-all"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

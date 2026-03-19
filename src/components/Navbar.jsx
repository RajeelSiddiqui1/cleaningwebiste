import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ArrowRight } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Team", path: "/team" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-md border-b border-dark-foreground/10">
      <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <span className="font-heading font-bold text-primary-foreground text-xl">E</span>
          </div>
          <div className="leading-tight">
            <span className="font-heading text-base font-bold text-primary block">Express</span>
            <span className="font-heading text-xs font-semibold text-dark-foreground/70 block">Residential & Commercial Cleaning</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-300 ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-dark-foreground/80 hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2 text-dark-foreground/80">
            <Phone size={16} className="text-primary" />
            <span className="text-sm font-medium">+92 300 1234567</span>
          </div>
          <Link to="/contact" className="btn-primary text-xs py-3 px-6">
            Get A Quote <ArrowRight size={14} />
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-dark-foreground"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-dark border-t border-dark-foreground/10">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-medium py-2 ${
                  location.pathname === link.path ? "text-primary" : "text-dark-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="btn-primary text-xs py-3 px-6 w-fit mt-2"
            >
              Get A Quote <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

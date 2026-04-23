import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, ArrowRight, User, LogOut, Sparkles } from "lucide-react";
import { authAPI, getUserRole, isAuthenticated } from "../lib/api";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [role, setRole] = useState(null);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
    setRole(getUserRole());
    
    const adminEmail = localStorage.getItem("adminEmail");
    const userEmail = localStorage.getItem("userEmail");
    
    if (adminEmail) {
      setUserEmail(adminEmail);
    } else if (userEmail) {
      setUserEmail(userEmail);
    }
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Team", path: "/team" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
    localStorage.removeItem("userEmail");
    localStorage.removeItem("adminEmail");
    setIsLoggedIn(false);
    setUserEmail("");
    setRole(null);
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-md border-b border-dark-foreground/10">
      <div className="container mx-auto flex items-center justify-between h-20 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <img src="./favicon.jpg" alt="" />
          </div>
          <div className="leading-tight">
            <span className="font-heading text-base font-bold text-primary block">Express Residential </span>
            <span className="font-heading text-xs font-semibold text-dark-foreground/70 block">Commercial Cleaning Services</span>
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

        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 text-dark-foreground/80">
            <Phone size={16} className="text-primary" />
            <span className="text-sm font-medium">416 804 4646</span>
          </div>
          
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-all"
              >
                <User size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">
                  {role === "Admin" ? "Admin" : "User"}
                </span>
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-dark-section border border-dark-foreground/10 rounded-xl shadow-lg overflow-hidden">
                  <div className="p-3 border-b border-dark-foreground/10">
                    <p className="text-sm font-medium text-dark-foreground">Signed in as</p>
                    <p className="text-xs text-dark-foreground/60 truncate">{userEmail}</p>
                  </div>
                  
                  <Link
                    to="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-dark-foreground hover:bg-dark-foreground/5 transition-all"
                  >
                    My Profile
                  </Link>

                  {role === "Admin" ? (
                    <Link
                      to="/admin/home"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-dark-foreground hover:bg-dark-foreground/5 transition-all"
                    >
                      Admin Dashboard
                    </Link>
                  ) : null}
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-3 text-sm text-destructive hover:bg-destructive/10 transition-all"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-dark-foreground/80 hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link to="/contact" className="btn-primary text-xs py-3 px-6">
                Get A Quote <ArrowRight size={14} />
              </Link>
            </div>
          )}
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
            
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium py-2 text-primary"
                >
                  My Profile
                </Link>
                {role === "Admin" && (
                  <Link
                    to="/admin/home"
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium py-2 text-primary"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-sm font-medium py-2 text-destructive text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium py-2 text-primary"
              >
                Sign In
              </Link>
            )}
            
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

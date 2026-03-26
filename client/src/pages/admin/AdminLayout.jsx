import { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
  Users,
  CalendarDays,
  MessageSquareQuote,
  MessageSquare
} from "lucide-react";
import { authAPI } from "../../lib/api";

const menuItems = [
  { path: "/admin/home", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/services", label: "Services", icon: Package },
  { path: "/admin/bookings", label: "Bookings", icon: CalendarDays },
  { path: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { path: "/admin/contacts", label: "Inbox", icon: MessageSquare },
  { path: "/admin/users", label: "Users", icon: Users },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between"
        style={{ backgroundColor: "#1C9B60" }}>
        <div className="flex items-center gap-2">
           <img src="./favicon.jpg" alt="" />
          <span className="font-heading font-bold text-lg" style={{ color: '#ffffff' }}>Admin Dashboard</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-white/10 rounded-lg text-white"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-dark/50 lg:hidden transition-opacity opacity-100"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 p-6 transition-transform duration-300 transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "#1C9B60" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 mb-10">
         
          <span className="font-heading font-bold text-xl" style={{ color: '#ffffff' }}>Admin Dashboard</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-white/20"
                    : "hover:bg-white/10"
                }`}
                style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.8)' }}
              >
                <item.icon size={20} style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.8)' }} />
                <span className="font-medium" style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.8)' }}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full mt-10"
          style={{ color: 'rgba(255,255,255,0.8)' }}
        >
          <LogOut size={20} style={{ color: 'rgba(255,255,255,0.8)' }} />
          <span className="font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
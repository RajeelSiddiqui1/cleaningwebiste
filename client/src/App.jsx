import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import BookNow from "./pages/BookNow";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import AdminServices from "./pages/admin/AdminServices";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminRoute from "./pages/admin/AdminRoute";
import "./app.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<>
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1">
              <Index />
            </main>
            <Footer />
          </div>
        </>} />
        <Route path="/about" element={<>
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1">
              <About />
            </main>
            <Footer />
          </div>
        </>} />
        <Route path="/services" element={<>
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1">
              <Services />
            </main>
            <Footer />
          </div>
        </>} />
        <Route path="/team" element={<>
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1">
              <Team />
            </main>
            <Footer />
          </div>
        </>} />
        <Route path="/contact" element={<>
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1">
              <Contact />
            </main>
            <Footer />
          </div>
        </>} />

        <Route path="/book/:id" element={<>
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1">
              <BookNow />
            </main>
            <Footer />
          </div>
        </>} />

        <Route path="/profile" element={<>
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1">
              <Profile />
            </main>
            <Footer />
          </div>
        </>} />

        {/* Auth Routes - Single login page handles both Admin and User */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes - Protected, only accessible to Admin role */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route index element={<Navigate to="/admin/home" replace />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

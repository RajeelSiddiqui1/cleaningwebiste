import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Calendar, MapPin, Phone, Mail, Clock, LayoutDashboard, Loader2 } from "lucide-react";
import { bookingAPI, contactAPI, isAuthenticated, getUserRole, IMAGE_BASE_URL } from "../lib/api";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bookings"); // "bookings" | "contacts"

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [bookingsRes, contactsRes] = await Promise.all([
          bookingAPI.getUserBookings(),
          contactAPI.getUserContacts()
        ]);
        
        if (bookingsRes.ok) setBookings(bookingsRes.data.bookings);
        if (contactsRes.ok) setContacts(contactsRes.data.contacts);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const userEmail = localStorage.getItem("userEmail") || localStorage.getItem("adminEmail");
  const userName = userEmail ? userEmail.split('@')[0] : "Customer";
  const role = getUserRole();

  const getStatusBadge = (status) => {
    const statusConfig = {
      Pending: "bg-yellow-100 text-yellow-800",
      Confirmed: "bg-blue-100 text-blue-800",
      Completed: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
    };
    return statusConfig[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 section-padding bg-background min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-3xl p-8 sticky top-28 shadow-sm flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-primary/20 text-primary rounded-full flex items-center justify-center font-heading font-bold text-4xl mb-4">
                {userName.charAt(0).toUpperCase()}
              </div>
              <h2 className="font-heading text-xl font-bold mb-1">{userName}</h2>
              <p className="text-muted-foreground text-sm mb-6 flex items-center gap-2 justify-center">
                <Mail size={14}/> {userEmail}
              </p>
              
              <div className="w-full pt-6 border-t border-border flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Account Role</span>
                <span className="bg-dark text-dark-foreground text-sm font-semibold py-2 px-4 rounded-full mx-auto shadow-sm">
                  {role === "Admin" ? "Administrator" : "Valued Customer"}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm min-h-[500px]">
              
              {/* Tab Navigation */}
              <div className="flex items-center gap-6 mb-8 pb-4 border-b border-border">
                <button 
                  onClick={() => setActiveTab("bookings")}
                  className={`font-heading text-xl font-bold flex items-center gap-2 pb-4 tracking-wide -mb-[17px] border-b-2 transition-colors ${activeTab === "bookings" ? "text-primary border-primary" : "text-muted-foreground hover:text-foreground border-transparent"}`}
                >
                  <LayoutDashboard size={20}/> Service History
                  {activeTab === "bookings" && (
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ml-2">
                       {bookings.length}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => setActiveTab("contacts")}
                  className={`font-heading text-xl font-bold flex items-center gap-2 pb-4 tracking-wide -mb-[17px] border-b-2 transition-colors ${activeTab === "contacts" ? "text-primary border-primary" : "text-muted-foreground hover:text-foreground border-transparent"}`}
                >
                  <Mail size={20}/> My Inquiries
                  {activeTab === "contacts" && (
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ml-2">
                       {contacts.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Bookings View */}
              {activeTab === "bookings" && (
                <>
                  {bookings.length === 0 ? (
                    <div className="text-center py-20">
                      <Calendar className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                      <h4 className="text-xl font-bold mb-2">No Bookings Found</h4>
                      <p className="text-muted-foreground mb-6">You haven't scheduled any professional cleanings yet.</p>
                      <button onClick={() => navigate("/services")} className="btn-primary">
                        Explore Services
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {bookings.map((booking) => (
                        <motion.div 
                          key={booking._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow bg-background"
                        >
                          <div className="flex flex-col md:flex-row gap-6">
                            {/* Service Thumbnail */}
                            <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden bg-muted shrink-0 relative">
                              {booking.service?.image ? (
                                <img src={`${IMAGE_BASE_URL}/${booking.service.image}`} alt={booking.service.title} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">Prestige Clean</div>
                              )}
                              <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md ${getStatusBadge(booking.status)}`}>
                                {booking.status}
                              </div>
                            </div>
    
                            {/* Booking Details */}
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-heading text-xl font-bold">{booking.service?.title || "Unknown Service"}</h4>
                                  {booking.service?.charges && (
                                    <span className="text-sm font-semibold text-primary">$ {booking.service.charges}</span>
                                  )}
                                </div>
                                
                                <div className="grid sm:grid-cols-2 gap-y-3 gap-x-6 mt-4 text-sm text-foreground/80">
                                  <div className="flex items-center gap-2">
                                    <Calendar size={15} className="text-muted-foreground"/> 
                                    {new Date(booking.date).toLocaleDateString()}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock size={15} className="text-muted-foreground"/> 
                                    {booking.time}
                                  </div>
                                  <div className="flex items-center gap-2 sm:col-span-2">
                                    <MapPin size={15} className="text-muted-foreground shrink-0"/> 
                                    <span className="truncate">{booking.address}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
                                <span>Booking ID: <span className="font-mono">{booking._id.substring(0, 8).toUpperCase()}</span></span>
                                <span>Requested: {new Date(booking.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Contacts View */}
              {activeTab === "contacts" && (
                <>
                  {contacts.length === 0 ? (
                    <div className="text-center py-20">
                      <Mail className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                      <h4 className="text-xl font-bold mb-2">No Inquiries Found</h4>
                      <p className="text-muted-foreground mb-6">You haven't submitted any questions or requests via the contact form.</p>
                      <button onClick={() => navigate("/contact")} className="btn-primary">
                        Contact Support
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {contacts.map((contact) => (
                        <motion.div 
                          key={contact._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow bg-background flex flex-col gap-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border pb-4">
                            <div>
                               <h4 className="font-heading text-lg font-bold mb-1">{contact.subject}</h4>
                               <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest flex items-center gap-2">
                                 <Calendar size={12}/> {new Date(contact.createdAt).toLocaleDateString()}
                               </p>
                            </div>
                            <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shrink-0 ${contact.status === 'Resolved' ? 'bg-green-100 text-green-700' : contact.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {contact.status}
                            </div>
                          </div>
                          
                          <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap bg-muted/30 p-4 rounded-xl">
                            {contact.message}
                          </div>
                          
                          <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                             <span>Inquiry ID: <span className="font-mono">{contact._id.substring(0, 8).toUpperCase()}</span></span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;

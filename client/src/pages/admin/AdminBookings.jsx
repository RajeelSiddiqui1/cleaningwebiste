import { useState, useEffect } from "react";
import { 
  Calendar, MapPin, User, Mail, Phone, Loader2, Clock, CheckCircle, 
  XOctagon, Clock3, AlertCircle 
} from "lucide-react";
import { bookingAPI, IMAGE_BASE_URL } from "../../lib/api";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchBookings = async () => {
    try {
      const result = await bookingAPI.getAllBookings();
      if (result.ok) {
        setBookings(result.data.bookings);
      }
    } catch (error) {
      console.error("Failed to fetch admin bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const result = await bookingAPI.updateStatus(id, newStatus);
      if (result.ok) {
        setBookings(bookings.map((b) => b._id === id ? result.data.booking : b));
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Update status failed", error);
      alert("Error updating status");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending": return <Clock3 size={16} className="text-yellow-600" />;
      case "Confirmed": return <AlertCircle size={16} className="text-blue-600" />;
      case "Completed": return <CheckCircle size={16} className="text-green-600" />;
      case "Cancelled": return <XOctagon size={16} className="text-red-600" />;
      default: return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100/50 text-yellow-700 border-yellow-200";
      case "Confirmed": return "bg-blue-100/50 text-blue-700 border-blue-200";
      case "Completed": return "bg-green-100/50 text-green-700 border-green-200";
      case "Cancelled": return "bg-red-100/50 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
            Reservation Ledger
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage all client service bookings across the platform.
          </p>
        </div>
        <div className="bg-card border border-border px-4 py-2 rounded-xl shadow-sm text-sm font-semibold flex items-center gap-3">
          <Calendar size={18} className="text-primary"/>
          {bookings.length} Total Bookings
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-2xl shadow-sm">
          <Calendar className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="font-heading text-xl font-bold text-foreground mb-2">
            No Active Bookings
          </h3>
          <p className="text-muted-foreground mb-6">
            The ledger is currently empty.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              
              {/* Header Ribbon */}
              <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-muted/40 border-b border-border gap-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest font-semibold tracking-wide">
                    ID: {booking._id.substring(0, 8)}
                  </span>
                  <span className="text-muted-foreground text-xs">•</span>
                  <span className="text-xs text-muted-foreground font-medium">
                    Requested on {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                {/* Status Changer */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mr-2">Status: </span>
                  {updatingId === booking._id ? (
                    <div className="px-4 py-1.5 rounded-full border border-border flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin text-primary" />
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Updating...</span>
                    </div>
                  ) : (
                    <select
                      value={booking.status}
                      onChange={(e) => handleUpdateStatus(booking._id, e.target.value)}
                      className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border cursor-pointer appearance-none ${getStatusClass(booking.status)} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  )}
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid md:grid-cols-12 gap-6 p-6">
                
                {/* Client Details Section */}
                <div className="md:col-span-4 border-r md:pr-6 border-border flex flex-col gap-4">
                  <h4 className="text-xs font-semibold text-primary uppercase tracking-widest flex items-center gap-2 mb-2">
                    <User size={14}/> Client Profile
                  </h4>
                  <div>
                    <p className="font-heading font-bold text-lg mb-1">{booking.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mb-1">
                      <Mail size={14}/> {booking.email}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Phone size={14}/> {booking.phone}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-2">Service Location</p>
                    <p className="text-sm font-medium flex items-start gap-2">
                      <MapPin size={16} className="text-primary shrink-0 mt-0.5"/>
                      <span className="leading-relaxed">{booking.address}</span>
                    </p>
                  </div>
                </div>

                {/* Service Details Section */}
                <div className="md:col-span-8 flex flex-col justify-between">
                  <h4 className="text-xs font-semibold text-primary uppercase tracking-widest flex items-center gap-2 mb-4">
                    <Calendar size={14}/> Reservation Specifics
                  </h4>
                  
                  <div className="flex sm:flex-row flex-col gap-6 items-start">
                    {/* Service Preview Image */}
                    {booking.service ? (
                      <div className="w-full sm:w-32 h-24 rounded-xl overflow-hidden shrink-0 border border-border shadow-sm">
                         {booking.service.image ? (
                           <img src={`${IMAGE_BASE_URL}/${booking.service.image}`} alt={booking.service.title} className="w-full h-full object-cover"/>
                         ) : (
                           <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs font-bold uppercase tracking-widest">No Image</div>
                         )}
                      </div>
                    ) : (
                      <div className="w-full sm:w-32 h-24 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive flex flex-col items-center justify-center shrink-0 text-center p-2">
                        <XOctagon size={24} className="mb-1" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Service Deleted</span>
                      </div>
                    )}
                    
                    {/* Schedule & Price */}
                    <div className="flex-1 w-full flex flex-col h-full justify-between">
                      <div>
                        {booking.service ? (
                          <h3 className="font-heading text-xl font-bold mb-2 text-foreground">{booking.service.title}</h3>
                        ) : (
                          <h3 className="font-heading text-xl font-bold mb-2 text-muted-foreground italic">Unavailable Service</h3>
                        )}
                        <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                          <span className="flex items-center gap-1.5 text-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border">
                            <Calendar size={14} className="text-primary"/> {new Date(booking.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1.5 text-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border">
                            <Clock size={14} className="text-primary"/> {booking.time}
                          </span>
                        </div>
                      </div>
                      
                      {booking.service?.charges && (
                        <div className="mt-4 sm:mt-0 flex justify-end">
                           <span className="font-heading text-lg font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-xl border border-primary/20">
                             {booking.service.charges}
                           </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;

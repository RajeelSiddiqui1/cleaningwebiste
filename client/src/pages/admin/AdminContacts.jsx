import { useState, useEffect } from "react";
import { 
  Mail, Calendar, Loader2, MessageSquare, Clock3, 
  CheckCircle, FolderOpen, AlertCircle, XOctagon 
} from "lucide-react";
import { contactAPI } from "../../lib/api";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchContacts = async () => {
    try {
      const result = await contactAPI.getAllAdmin();
      if (result.ok) {
        setContacts(result.data.contacts);
      }
    } catch (error) {
      console.error("Failed to fetch administrative contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const result = await contactAPI.updateStatus(id, newStatus);
      if (result.ok) {
        setContacts(contacts.map((c) => c._id === id ? result.data.contact : c));
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
      case "In Progress": return <AlertCircle size={16} className="text-blue-600" />;
      case "Resolved": return <CheckCircle size={16} className="text-green-600" />;
      case "Archived": return <FolderOpen size={16} className="text-muted-foreground" />;
      default: return null;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100/50 text-yellow-700 border-yellow-200";
      case "In Progress": return "bg-blue-100/50 text-blue-700 border-blue-200";
      case "Resolved": return "bg-green-100/50 text-green-700 border-green-200";
      case "Archived": return "bg-muted/50 text-muted-foreground border-border";
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
            Inquiries Inbox
          </h1>
          <p className="text-muted-foreground">
            Review detailed messages submitted through the contact channels logically tracking statuses tracking individual progress natively.
          </p>
        </div>
        <div className="bg-card border border-border px-4 py-2 rounded-xl shadow-sm text-sm font-semibold flex items-center gap-3 text-foreground">
          <MessageSquare size={18} className="text-primary"/>
          {contacts.length} Messages
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-2xl shadow-sm">
          <MessageSquare className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="font-heading text-xl font-bold text-foreground mb-2">
            Inbox Zero
          </h3>
          <p className="text-muted-foreground mb-6">
            There are currently no inbound messages matching administration queries.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {contacts.map((contact) => (
            <div key={contact._id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col transition-shadow hover:shadow-md">
              
              {/* Card Header Ribbons */}
              <div className="bg-muted/30 px-6 py-4 border-b border-border flex justify-between items-center gap-4">
                <div className="flex shrink-0 gap-2 items-center text-xs text-muted-foreground font-semibold uppercase tracking-widest leading-loose">
                   <Calendar size={14}/> {new Date(contact.createdAt).toLocaleDateString()}
                </div>
                
                {/* Visual Status Dropdown Selectors */}
                <div className="shrink-0 flex items-center gap-2 relative">
                  {updatingId === contact._id ? (
                    <div className="px-3 py-1.5 rounded-full border border-border flex items-center gap-2">
                      <Loader2 size={12} className="animate-spin text-primary" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Updating...</span>
                    </div>
                  ) : (
                    <select
                      value={contact.status}
                      onChange={(e) => handleUpdateStatus(contact._id, e.target.value)}
                      className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 pr-6 rounded-full border cursor-pointer appearance-none ${getStatusClass(contact.status)} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                    >
                      <option value="Pending">Pending Review</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Archived">Archived</option>
                    </select>
                  )}
                </div>
              </div>

              {/* Message Payload Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-1 leading-tight">{contact.subject}</h3>
                  <div className="flex items-center gap-2 text-sm text-primary font-semibold mb-4">
                     <Mail size={14}/> {contact.name} ({contact.email})
                  </div>
                </div>

                <div className="bg-background border border-border rounded-xl p-4 flex-1 text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {contact.message}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContacts;

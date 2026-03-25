import { useState, useEffect, useRef } from "react";
import { 
  MessageSquareQuote, User, Plus, Edit, Trash2, 
  Search, Loader2, X, UploadCloud, CheckCircle, XCircle 
} from "lucide-react";
import { testimonialAPI, IMAGE_BASE_URL } from "../../lib/api";

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    _id: null,
    name: "",
    role: "",
    text: "",
    isActive: true,
  });
  
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const fetchTestimonials = async () => {
    try {
      const result = await testimonialAPI.getAllAdmin();
      if (result.ok) {
        setTestimonials(result.data.testimonials);
      }
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setFormData({
      _id: null,
      name: "",
      role: "",
      text: "",
      isActive: true,
    });
    setImageFile(null);
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openModal = (testimonial = null) => {
    resetForm();
    if (testimonial) {
      setFormData({
        _id: testimonial._id,
        name: testimonial.name,
        role: testimonial.role,
        text: testimonial.text,
        isActive: testimonial.isActive,
      });
      if (testimonial.image) {
        setPreviewImage(`${IMAGE_BASE_URL}/${testimonial.image}`);
      }
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const dataToSubmit = { ...formData };
      if (imageFile) {
        dataToSubmit.image = imageFile;
      }
      
      let result;
      if (formData._id) {
        result = await testimonialAPI.update(formData._id, dataToSubmit);
      } else {
        result = await testimonialAPI.create(dataToSubmit);
      }

      if (result.ok) {
        setIsModalOpen(false);
        fetchTestimonials();
      } else {
        alert("Failed to save testimonial");
      }
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial permanently?")) return;
    try {
      const result = await testimonialAPI.delete(id);
      if (result.ok) fetchTestimonials();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const result = await testimonialAPI.toggleStatus(id);
      if (result.ok && result.data.testimonial) {
        setTestimonials(testimonials.map(t => 
          t._id === id ? { ...t, isActive: result.data.testimonial.isActive } : t
        ));
      }
    } catch (error) {
      console.error("Status toggle error:", error);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-1">
            Testimonials
          </h1>
          <p className="text-muted-foreground">Manage client reviews shown on the main slider.</p>
        </div>
        <button 
          onClick={() => openModal()} 
          className="btn-primary flex items-center gap-2 whitespace-nowrap"
        >
          <Plus size={18} /> Add Review
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-xl">
          <MessageSquareQuote className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No Testimonials Yet</h3>
          <p className="text-muted-foreground mb-6">Create the first stunning client review.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-primary/20">
                      {testimonial.image ? (
                        <img src={`${IMAGE_BASE_URL}/${testimonial.image}`} className="w-full h-full object-cover" />
                      ) : (
                        <User size={20} className="text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground leading-tight">{testimonial.name}</h3>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">{testimonial.role}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleToggleStatus(testimonial._id)}
                    className="shrink-0"
                    title={testimonial.isActive ? "Deactivate" : "Activate"}
                  >
                    {testimonial.isActive ? (
                      <CheckCircle size={20} className="text-green-500 hover:text-green-600 transition-colors" />
                    ) : (
                      <XCircle size={20} className="text-muted-foreground hover:text-destructive transition-colors" />
                    )}
                  </button>
                </div>
                
                <p className="text-sm text-muted-foreground italic line-clamp-4 flex-1">
                  "{testimonial.text}"
                </p>
              </div>
              
              <div className="bg-muted/30 px-6 py-3 border-t border-border flex justify-end gap-2">
                <button 
                  onClick={() => openModal(testimonial)}
                  className="p-2 text-blue-600 hover:bg-blue-600/10 rounded-lg transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(testimonial._id)}
                  className="p-2 text-red-600 hover:bg-red-600/10 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Testimonial Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg relative z-10 p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
              <X size={20} />
            </button>
            <h2 className="font-heading text-2xl font-bold mb-6">
              {formData._id ? "Edit Testimonial" : "Create Testimonial"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-24 h-24 rounded-full border-2 border-dashed border-border flex items-center justify-center overflow-hidden mb-3 cursor-pointer group hover:border-primary transition-colors bg-muted/50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {previewImage ? (
                    <img src={previewImage} className="w-full h-full object-cover group-hover:brightness-75 transition-all" />
                  ) : (
                    <UploadCloud size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                </div>
                <button type="button" className="text-xs text-primary font-bold uppercase tracking-widest" onClick={() => fileInputRef.current?.click()}>
                  Upload Portrait
                </button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Client Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Role / Title</label>
                  <input type="text" name="role" required value={formData.role} onChange={handleInputChange} className="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="e.g. CEO or Homeowner" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Review Text</label>
                <textarea name="text" required value={formData.text} onChange={handleInputChange} rows={4} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"></textarea>
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="w-4 h-4 text-primary rounded border-border focus:ring-primary"/>
                <label htmlFor="isActive" className="text-sm font-semibold text-foreground">Make Active (Visible in Slider)</label>
              </div>

              <div className="flex justify-end pt-4 border-t border-border">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-sm font-semibold text-foreground hover:bg-muted rounded-xl transition-colors mr-2">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="btn-primary py-2 px-6 text-sm">
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : "Save Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;

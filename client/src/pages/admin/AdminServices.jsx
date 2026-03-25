import { useState, useEffect } from "react";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Loader2,
  X,
  Image as ImageIcon,
  DollarSign,
  Sparkles
} from "lucide-react";
import { serviceAPI, IMAGE_BASE_URL } from "../../lib/api";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    points: [""],
    charges: "",
    image: null,
    isActive: true,
    specailService: false,
  });

  // Fetch services
  const fetchServices = async () => {
    try {
      const result = await serviceAPI.getAllAdmin();
      if (result.ok && result.data.services) {
        setServices(result.data.services);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  // Handle point changes
  const handlePointChange = (index, value) => {
    const newPoints = [...formData.points];
    newPoints[index] = value;
    setFormData({ ...formData, points: newPoints });
  };

  const addPoint = () => {
    setFormData({ ...formData, points: [...formData.points, ""] });
  };

  const removePoint = (index) => {
    if (formData.points.length > 1) {
      const newPoints = formData.points.filter((_, i) => i !== index);
      setFormData({ ...formData, points: newPoints });
    }
  };

  // Handle file input
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  // Open modal for add
  const handleAddClick = () => {
    setEditingService(null);
    setFormData({ 
      title: "", 
      description: "", 
      points: [""], 
      charges: "", 
      image: null,
      isActive: true,
      specailService: false 
    });
    setShowModal(true);
  };

  // Open modal for edit
  const handleEditClick = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      points: Array.isArray(service.points) && service.points.length > 0 ? service.points : [""],
      charges: service.charges,
      image: null,
      isActive: service.isActive !== undefined ? service.isActive : true,
      specailService: service.specailService || false
    });
    setShowModal(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    setDeletingId(id);
    try {
      const result = await serviceAPI.delete(id);

      if (result.ok) {
        setServices(services.filter((s) => s._id !== id));
      } else {
        alert(result.data.message || "Failed to delete service");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Filter out empty points
      const filteredPoints = formData.points.filter(p => p.trim() !== "");
      
      const serviceData = {
        title: formData.title,
        description: formData.description,
        points: filteredPoints,
        charges: formData.charges,
        image: formData.image,
        isActive: formData.isActive,
        specailService: formData.specailService
      };

      let result;
      if (editingService) {
        result = await serviceAPI.update(editingService._id, serviceData);
      } else {
        result = await serviceAPI.create(serviceData);
      }

      if (result.ok) {
        if (editingService) {
          setServices(services.map((s) => s._id === editingService._id ? result.data.service : s));
        } else {
          setServices([...services, result.data.service]);
        }
        setShowModal(false);
      } else {
        alert(result.data.message || "Failed to save service");
      }
    } catch (error) {
      console.error("Save failed:", error);
      alert("Save failed");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle toggle status
  const handleToggleStatus = async (id) => {
    setTogglingId(id);
    try {
      const result = await serviceAPI.toggleStatus(id);

      if (result.ok) {
        setServices(services.map((s) => s._id === id ? { ...s, isActive: !s.isActive } : s));
      } else {
        alert(result.data.message || "Failed to toggle status");
      }
    } catch (error) {
      console.error("Toggle status failed:", error);
      alert("Toggle status failed");
    } finally {
      setTogglingId(null);
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
            Services Management
          </h1>
          <p className="text-muted-foreground">
            Add, edit, and manage your cleaning services
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="btn-primary"
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {/* Services Grid */}
      {services.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-2xl">
          <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="font-heading text-xl font-bold text-foreground mb-2">
            No Services Yet
          </h3>
          <p className="text-muted-foreground mb-6">
            Start by adding your first cleaning service
          </p>
          <button onClick={handleAddClick} className="btn-primary">
            <Plus size={18} />
            Add First Service
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 bg-muted">
                {service.image ? (
                  <img
                    src={`${IMAGE_BASE_URL}/${service.image}`}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-muted-foreground/30" />
                  </div>
                )}

                {/* Special Badge */}
                {service.specailService && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                      Special
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Points */}
                {service.points && service.points.length > 0 && (
                  <div className="text-sm text-muted-foreground mb-4">
                    <span className="font-medium text-foreground">Features: </span>
                    {service.points.join(", ")}
                  </div>
                )}

                {/* Charges */}
                {service.charges && (
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="font-heading font-bold text-primary">
                      {service.charges}
                    </span>
                  </div>
                )}

                {/* Status Toggle */}
                <div className="mb-4">
                  <button
                    onClick={() => handleToggleStatus(service._id)}
                    disabled={togglingId === service._id}
                    className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all flex items-center gap-2 ${
                      service.isActive
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    {togglingId === service._id ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <div className={`w-1.5 h-1.5 rounded-full ${service.isActive ? "bg-green-600" : "bg-red-600"}`} />
                    )}
                    {service.isActive ? "Active" : "Inactive"}
                  </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-border">
                  <button
                    onClick={() => handleEditClick(service)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    disabled={deletingId === service._id}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-all disabled:opacity-50"
                  >
                    {deletingId === service._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/50">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-heading text-xl font-bold text-foreground">
                {editingService ? "Edit Service" : "Add New Service"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Service Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="e.g., Residential Cleaning"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="Describe your service..."
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-foreground">
                    Features / Points
                  </label>
                  <button
                    type="button"
                    onClick={addPoint}
                    className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    <Plus size={14} />
                    Add Point
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.points.map((point, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={point}
                        onChange={(e) => handlePointChange(index, e.target.value)}
                        className="flex-1 px-4 py-2 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-primary transition-all"
                        placeholder={`Service point ${index + 1}`}
                        required={index === 0}
                      />
                      {formData.points.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePoint(index)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Charges
                </label>
                <input
                  type="text"
                  name="charges"
                  value={formData.charges}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="e.g., $99 - $299"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Service Image
                </label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="service-image"
                  />
                  <label htmlFor="service-image" className="cursor-pointer">
                    {formData.image ? (
                      <div className="flex items-center justify-center gap-2 text-primary">
                        <ImageIcon size={20} />
                        <span>{formData.image.name}</span>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="w-10 h-10 text-muted-foreground/50 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload image
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Service Flags */}
              <div className="flex items-center gap-6 p-4 bg-muted/50 rounded-xl border border-border">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-primary border-border rounded focus:ring-primary focus:ring-offset-0 transition-all"
                    />
                  </div>
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Active</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      name="specailService"
                      checked={formData.specailService}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-primary border-border rounded focus:ring-primary focus:ring-offset-0 transition-all"
                    />
                  </div>
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    <Sparkles size={14} className="text-primary" />
                    Special Service
                  </span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 border border-border rounded-xl text-foreground hover:bg-muted transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Package size={18} />
                      {editingService ? "Update Service" : "Add Service"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
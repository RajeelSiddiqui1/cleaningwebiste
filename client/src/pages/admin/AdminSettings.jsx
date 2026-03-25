import { useState } from "react";
import { Settings, User, Lock, Bell, Save, Loader2 } from "lucide-react";

const AdminSettings = () => {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "Admin User",
    email: "admin@cleanpro.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailNotifications: true,
    bookingAlerts: true,
    weeklyReports: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate save
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Nav */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-2xl p-4 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl">
              <User size={20} />
              <span className="font-medium">Profile</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted rounded-xl transition-all">
              <Lock size={20} />
              <span className="font-medium">Security</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-muted rounded-xl transition-all">
              <Bell size={20} />
              <span className="font-medium">Notifications</span>
            </button>
          </div>
        </div>

        {/* Settings Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Section */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Profile Information
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Change Password
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Enter current password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Notifications
                </h3>
              </div>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-muted rounded-xl cursor-pointer">
                  <div>
                    <span className="font-medium text-foreground">Email Notifications</span>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={formData.emailNotifications}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-primary rounded focus:ring-primary"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-muted rounded-xl cursor-pointer">
                  <div>
                    <span className="font-medium text-foreground">Booking Alerts</span>
                    <p className="text-sm text-muted-foreground">Get notified for new bookings</p>
                  </div>
                  <input
                    type="checkbox"
                    name="bookingAlerts"
                    checked={formData.bookingAlerts}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-primary rounded focus:ring-primary"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-muted rounded-xl cursor-pointer">
                  <div>
                    <span className="font-medium text-foreground">Weekly Reports</span>
                    <p className="text-sm text-muted-foreground">Receive weekly summary reports</p>
                  </div>
                  <input
                    type="checkbox"
                    name="weeklyReports"
                    checked={formData.weeklyReports}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-primary rounded focus:ring-primary"
                  />
                </label>
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving Changes...
                </>
              ) : saved ? (
                <>
                  <Settings className="w-5 h-5" />
                  Saved Successfully!
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
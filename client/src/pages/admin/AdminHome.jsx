import { useEffect, useState } from "react";
import {
  Package,
  Users,
  Calendar,
  MessageSquare,
  Loader2,
  Sparkles,
  Clock
} from "lucide-react";
import { adminAPI } from "../../lib/api";

const AdminHome = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalServices: 0,
    totalUsers: 0,
    totalBookings: 0,
    totalInquiries: 0
  });
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await adminAPI.getStats();
        if (result.ok) {
          setStats(result.data.stats);
          setActivities(result.data.recentActivities);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsConfig = [
    { label: "Total Services", value: stats.totalServices, icon: Package, color: "text-blue-600" },
    { label: "Active Users", value: stats.totalUsers, icon: Users, color: "text-emerald-600" },
    { label: "Bookings", value: stats.totalBookings, icon: Calendar, color: "text-orange-600" },
    { label: "Inquiries", value: stats.totalInquiries, icon: MessageSquare, color: "text-purple-600" },
  ];

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
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your cleaning services.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsConfig.map((stat, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <stat.icon className={`w-6 h-6 ${stat.color || 'text-primary'}`} />
              </div>
            </div>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-1">
              {stat.value}
            </h3>
            <p className="text-muted-foreground text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-heading text-lg font-bold text-foreground">
              Quick Actions
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/admin/services"
              className="p-4 bg-muted rounded-xl hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-all duration-200 text-center"
            >
              <Package className="w-6 h-6 text-primary mx-auto mb-2" />
              <span className="text-sm font-medium text-foreground">Manage Services</span>
            </a>
            <a
              href="/admin/bookings"
              className="p-4 bg-muted rounded-xl hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-all duration-200 text-center"
            >
              <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
              <span className="text-sm font-medium text-foreground">View Bookings</span>
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-heading text-lg font-bold text-foreground">
              Recent Activity
            </h3>
          </div>
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.service}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(activity.time).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center py-4 text-muted-foreground text-sm">No recent activity</p>
            )}
          </div>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-emerald-500 rounded-2xl p-8 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold mb-2">
              Welcome to Express Admin
            </h2>
            <p className="text-primary-foreground/80">
              Manage your residential and commercial cleaning operations with ease.
            </p>
          </div>
          <Sparkles className="w-16 h-16 text-primary-foreground/20 hidden md:block" />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
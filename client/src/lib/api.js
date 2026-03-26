const BASE_URL = import.meta.env.VITE_API_URL || "http://153.92.209.177:5008/";
const API_BASE_URL = `${BASE_URL}/api`;
const IMAGE_BASE_URL = `${BASE_URL}/uploads`;

// Helper function for API calls with session/cookies
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const isFormData = options.body instanceof FormData;

  const defaultOptions = {
    credentials: "include", // Important: sends cookies with request
    headers: isFormData ? {} : {
      "Content-Type": "application/json",
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);
    const data = await response.json();

    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const result = await apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // Store session based on role from backend
    if (result.ok && result.data.user) {
      const { role, email } = result.data.user;
      if (role === "Admin") {
        localStorage.setItem("adminEmail", email);
        localStorage.setItem("userRole", "Admin");
      } else {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", "User");
      }
    }

    return result;
  },

  register: async (userName, email, password, role = "User") => {
    const result = await apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify({ userName, email, password, role }),
    });

    // Store session after successful registration
    if (result.ok) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userRole", role || "User");
    }

    return result;
  },

  logout: async () => {
    const result = await apiCall("/auth/logout", {
      method: "POST",
    });

    // Clear all session data
    localStorage.removeItem("userEmail");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("userRole");

    return result;
  },
};

// Service API
export const serviceAPI = {
  getAll: () => apiCall("/service"),
  getAllAdmin: () => apiCall("/service/all"),

  getById: (id) => apiCall(`/service/${id}`),

  create: (serviceData) => {
    const formData = new FormData();
    Object.keys(serviceData).forEach((key) => {
      if (serviceData[key] !== null && serviceData[key] !== undefined) {
        if (Array.isArray(serviceData[key])) {
          serviceData[key].forEach(val => formData.append(key, val));
        } else {
          formData.append(key, serviceData[key]);
        }
      }
    });

    return apiCall("/service", {
      method: "POST",
      body: formData,
    });
  },

  update: (id, serviceData) => {
    const formData = new FormData();
    Object.keys(serviceData).forEach((key) => {
      if (serviceData[key] !== null && serviceData[key] !== undefined) {
        if (Array.isArray(serviceData[key])) {
          serviceData[key].forEach(val => formData.append(key, val));
        } else {
          formData.append(key, serviceData[key]);
        }
      }
    });

    return apiCall(`/service/${id}`, {
      method: "PUT",
      body: formData,
    });
  },

  toggleStatus: (id) =>
    apiCall(`/service/${id}/toggle`, {
      method: "PATCH",
    }),

  delete: (id) =>
    apiCall(`/service/${id}`, {
      method: "DELETE",
    }),
};

// Booking API
export const bookingAPI = {
  create: async (data) => {
    return apiCall("/booking", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getUserBookings: async () => {
    return apiCall("/booking/user");
  },

  getAllBookings: async () => {
    return apiCall("/booking/all");
  },

  updateStatus: async (id, status) => {
    return apiCall(`/booking/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },
};

// Testimonial API
export const testimonialAPI = {
  getActive: () => apiCall("/testimonial"),
  getAllAdmin: () => apiCall("/testimonial/all"),
  create: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    return apiCall("/testimonial", { method: "POST", body: formData });
  },
  update: (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    return apiCall(`/testimonial/${id}`, { method: "PUT", body: formData });
  },
  toggleStatus: (id) => apiCall(`/testimonial/${id}/toggle`, { method: "PATCH" }),
  delete: (id) => apiCall(`/testimonial/${id}`, { method: "DELETE" }),
};

// Contact API
export const contactAPI = {
  submit: (data) => apiCall("/contact", { method: "POST", body: JSON.stringify(data) }),
  getUserContacts: () => apiCall("/contact/user"),
  getAllAdmin: () => apiCall("/contact/all"),
  updateStatus: (id, status) => apiCall(`/contact/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
};

// Admin API
export const adminAPI = {
  getStats: () => apiCall("/admin/stats"),
  getUsers: () => apiCall("/admin/users"),
};

// Helper to check if user is logged in
export const isAuthenticated = () => {
  return localStorage.getItem("userEmail") || localStorage.getItem("adminEmail");
};

// Helper to get user role from session
export const getUserRole = () => {
  return localStorage.getItem("userRole");
};

// Helper to check if user is admin
export const isAdmin = () => {
  return getUserRole() === "Admin";
};

export { API_BASE_URL, IMAGE_BASE_URL };
export default { authAPI, serviceAPI, bookingAPI, testimonialAPI, contactAPI, adminAPI, isAuthenticated, getUserRole, isAdmin };
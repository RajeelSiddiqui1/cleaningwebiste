import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Login required" });
    }


    const decoded = jwt.verify(token, process.env.SECRET_TOKEN)

    req.user = decoded

    next()

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  
  }
};


 const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role (${req.user?.role}) is not allowed`,
      });
    }
    next();
  };
};

export {isAuthenticated, authorizeRoles}
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "reuired all feilds" });
    }

    const userEmailExists = await User.findOne({ email });

    if (userEmailExists) {
      return res.status(400).json({ message: "user email is already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      userName,
      email,
      password: hashPassword,
      role: role || "User",
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.SECRET_TOKEN, {
      expiresIn: "7d",
    });

    // Determine if we're in production
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ 
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        userName: user.userName,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { register, login, logout };

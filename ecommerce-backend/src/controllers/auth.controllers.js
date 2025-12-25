import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: `7d`,
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //check if user exists already
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: `Email exits already` });
    }

    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || `Failed to register user` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exists or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: `IUser does not exist` });
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      return res.status(400).json({ message: `Password do not match` });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || `Failed to login user` });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json({ message: "user deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

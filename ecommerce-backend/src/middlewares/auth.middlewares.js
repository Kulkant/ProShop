import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith(`Bearer`)
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      if (!req.user) {
        return res.status(404).json({ message: `User no longer exists ` });
      }

      return next();
    } catch (error) {
      return res.status(500).json({ message: `Not authorized - token failed` });
    }
  }
  if (!token) {
    return res.status(400).json({ message: `Not authorized - no token` });
  }
};

export default protect;

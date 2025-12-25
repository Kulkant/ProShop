const admin = (req, res, next) => {
  console.log("Admin Check: User Role received:", req.userRole);
  if (req.userRole == "admin") {
    next();
  } else {
    res.status(403).json({ message: `Not authorized as admin` });
  }
};

export default admin;

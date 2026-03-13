import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request for controller
    req.user = decoded.id;

    next();
  } catch (error) {
    console.error("❌ Error in authUser middleware:", error);
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

export default authUser;

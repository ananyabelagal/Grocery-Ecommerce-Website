import jwt from "jsonwebtoken";

export const authSeller = async (req, res, next) => {
  try {
    // Get seller token from cookie
    const token = req.cookies?.sellerToken;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Only allow the seller with the correct email (from env)
    if (decoded.email === process.env.SELLER_EMAIL) {
      req.seller = decoded.email; // attach info for future use
      next();
    } else {
      return res.status(403).json({ success: false, message: "Forbidden: Not a seller" });
    }
  } catch (error) {
    console.error("❌ Error in authSeller middleware:", error);
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
  }
};

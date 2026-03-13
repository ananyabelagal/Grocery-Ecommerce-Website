import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import { connectCloudinary } from "./config/cloudinary.js";

// Routes
import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";
import orderRoutes from "./routes/order.routes.js";

dotenv.config();

const app = express();

// ===== MIDDLEWARES =====
const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // 🔥 required for cookies
  })
);
app.use(cookieParser());
app.use(express.json());

// Debugging: log cookies on every request
app.use((req, res, next) => {
  console.log("Incoming Cookies:", req.cookies);
  next();
});

// ===== STATIC FILES =====
app.use("/images", express.static("uploads"));

// ===== ROUTES =====
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();

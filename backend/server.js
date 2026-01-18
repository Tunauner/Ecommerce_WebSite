import express from "express";
import dotenv from "dotenv";
import authroutes from "./routes/auth.routes.js";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import productroutes from "./routes/product.routes.js";
import cartroutes from "./routes/cart.routes.js";
import couponroutes from "./routes/coupon.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React frontend app
const __dirname = path.resolve();

// cloudinary config
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
app.use("/api/auth", authroutes);
app.use("/api/products", productroutes);
app.use("/api/cart", cartroutes);
app.use("/api/coupon", couponroutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/vite-project/dist")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "frontend/vite-project/dist", "index.html"),
    );
  });
}
app.listen(5000, () => {
  console.log(`Server is running on http://localhost:` + PORT);
  connectDB();
});

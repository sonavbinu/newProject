const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/partnerRoutes");
const storeRoutes = require("./routes/storeRoutes");
const customerAuthRoutes = require("./routes/customerAuthRoutes");
const publicRoutes = require("./routes/publicRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/customer-auth", customerAuthRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/orders", orderRoutes);

app.use("/uploads", express.static("uploads"));
app.use("/api/users", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/products", require("./routes/productRoutes"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

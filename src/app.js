const express = require("express");
const cors = require("cors");

const app = express();

/* ===========================
   MIDDLEWARE
=========================== */

// CORS (allow all for development)
app.use(cors());

// JSON parser
app.use(express.json());

/* ===========================
   HEALTH CHECK
=========================== */

app.get("/", (req, res) => {
  res.send("Smart Parking API Running");
});

/* ===========================
   AUTH ROUTES
=========================== */

app.use("/api/auth", require("./routes/authRoutes"));

/* ===========================
   ADMIN ROUTES (Modular)
=========================== */

// User Management
app.use("/api/admin/users", require("./routes/admin/userRoutes"));

// Staff Management
app.use("/api/admin/staff", require("./routes/admin/staffRoutes"));

// Parking Slot Management
app.use("/api/admin/slots", require("./routes/admin/slotRoutes"));

// Pricing Management
app.use("/api/admin/pricing", require("./routes/admin/pricingRoutes"));

// Analytics
app.use("/api/admin/analytics", require("./routes/admin/analyticsRoutes"));

// Security Logs
app.use("/api/admin/security", require("./routes/admin/securityRoutes"));

/* ===========================
   GLOBAL ERROR HANDLER
=========================== */

app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);

  res.status(err.status || 500).json({
    msg: err.message || "Server Error",
  });
});

module.exports = app;

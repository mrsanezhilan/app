const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    location: String,
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);

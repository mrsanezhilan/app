const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    slotNumber: String,
    type: { type: String, enum: ["2W", "4W", "EV"] },
    floor: String,
    zone: String,
    status: { type: String, default: "available" },
    enabled: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ParkingSlot", slotSchema);

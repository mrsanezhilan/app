const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema({
  hourlyRate: Number,
  peakRate: Number,
  peakStart: String,
  peakEnd: String,
  penaltyRate: Number,
  freeMinutes: Number
});

module.exports = mongoose.model("Pricing", pricingSchema);

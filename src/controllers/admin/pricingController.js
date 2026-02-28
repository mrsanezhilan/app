const Pricing = require("../../models/Pricing");

exports.setPricing = async (req, res) => {
  const pricing = await Pricing.create(req.body);
  res.json(pricing);
};

exports.getPricing = async (req, res) => {
  const pricing = await Pricing.findOne();
  res.json(pricing);
};

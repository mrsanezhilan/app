const ParkingSlot = require("../../models/ParkingSlot");

exports.createSlot = async (req, res) => {
  const slot = await ParkingSlot.create(req.body);
  res.json(slot);
};

exports.getSlots = async (req, res) => {
  const slots = await ParkingSlot.find();
  res.json(slots);
};

exports.updateSlot = async (req, res) => {
  await ParkingSlot.findByIdAndUpdate(req.params.id, req.body);
  res.json({ msg: "Updated" });
};

exports.deleteSlot = async (req, res) => {
  await ParkingSlot.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};

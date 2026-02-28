const AuditLog = require("../../models/AuditLog");

// View audit logs
exports.getLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

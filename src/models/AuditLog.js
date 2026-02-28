const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema(
  {
    adminId: String,
    action: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditSchema);

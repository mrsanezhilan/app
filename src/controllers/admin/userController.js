const User = require("../../models/User");
const AuditLog = require("../../models/AuditLog");
const mongoose = require("mongoose");

/// ✅ GET ALL USERS (with filters, pagination, search)
exports.getUsers = async (req, res) => {
  try {
    /// SECURITY: only admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const { page = 1, limit = 10, search = "", status } = req.query;

    const query = {
      role: { $ne: "admin" }, // do not show admin list
      name: { $regex: search, $options: "i" },
    };

    if (status !== undefined) {
      query.status = status === "true";
    }

    const users = await User.find(query)
      .select("-password") // hide password
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      users,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });

  } catch (e) {
    res.status(500).json({ msg: "Server error" });
  }
};


/// ✅ BLOCK USER
exports.blockUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await AuditLog.create({
      adminId: req.user.id,
      action: `Blocked user ${user.email}`,
      targetId: user._id,
    });

    res.json({ msg: "User blocked", user });

  } catch (e) {
    res.status(500).json({ msg: "Server error" });
  }
};


/// ✅ UNBLOCK USER
exports.unblockUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { status: true },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await AuditLog.create({
      adminId: req.user.id,
      action: `Unblocked user ${user.email}`,
      targetId: user._id,
    });

    res.json({ msg: "User unblocked", user });

  } catch (e) {
    res.status(500).json({ msg: "Server error" });
  }
};

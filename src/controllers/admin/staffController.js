const Staff = require("../../models/Staff");
const bcrypt = require("bcryptjs");

/// ================= ADD STAFF =================
exports.addStaff = async (req, res) => {
  try {
    const { name, email, password, phone, location } = req.body;

    /// VALIDATION
    if (!name || !email || !password || !phone || !location) {
      return res.status(400).json({
        msg: "All fields required",
      });
    }

    /// DUPLICATE EMAIL CHECK
    const exist = await Staff.findOne({ email });
    if (exist) {
      return res.status(400).json({
        msg: "Staff already exists",
      });
    }

    /// HASH PASSWORD
    const hash = await bcrypt.hash(password, 10);

    /// CREATE STAFF
    const staff = await Staff.create({
      name,
      email,
      password: hash,
      phone,
      location,
      status: true,
    });

    res.status(201).json({
      msg: "Staff created successfully",
      staff: {
        _id: staff._id,
        name: staff.name,
        email: staff.email,
        phone: staff.phone,
        location: staff.location,
        status: staff.status,
      },
    });
  } catch (err) {
    console.error("ADD STAFF ERROR:", err);
    res.status(500).json({
      msg: "Server error",
    });
  }
};


/// ================= GET STAFF =================
exports.getStaff = async (req, res) => {
  try {
    const staff = await Staff.find().select("-password");

    res.json(staff);
  } catch (err) {
    console.error("GET STAFF ERROR:", err);
    res.status(500).json({
      msg: "Server error",
    });
  }
};


/// ================= UPDATE STAFF =================
exports.updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, phone, location, status } = req.body;

    let updateData = {
      name,
      email,
      phone,
      location,
      status,
    };

    /// HASH PASSWORD IF PROVIDED
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updated = await Staff.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("-password");

    if (!updated) {
      return res.status(404).json({
        msg: "Staff not found",
      });
    }

    res.json({
      msg: "Staff updated",
      staff: updated,
    });
  } catch (err) {
    console.error("UPDATE STAFF ERROR:", err);
    res.status(500).json({
      msg: "Server error",
    });
  }
};


/// ================= DELETE STAFF =================
exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Staff.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        msg: "Staff not found",
      });
    }

    res.json({
      msg: "Staff deleted",
    });
  } catch (err) {
    console.error("DELETE STAFF ERROR:", err);
    res.status(500).json({
      msg: "Server error",
    });
  }
};

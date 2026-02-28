const User = require("../models/User");
const Staff = require("../models/Staff");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


/// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, vehicleNo } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: "All required fields missing" });
    }

    /// CHECK EXISTING
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    let userData = {
      name,
      email,
      password: hash,
      role,
    };

    /// USER VEHICLE
    if (role === "user") {
      if (!vehicleNo) {
        return res.status(400).json({
          msg: "Vehicle number required for users",
        });
      }
      userData.vehicleNo = vehicleNo;
    }

    const user = await User.create(userData);

    res.status(201).json({
      msg: "Registered successfully",
      user,
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};


/// ================= LOGIN (ADMIN + USER + STAFF) =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        msg: "Email and password required",
      });
    }

    /// ================= FIND ACCOUNT =================
    let account = await User.findOne({ email });

    /// IF NOT FOUND → CHECK STAFF
    if (!account) {
      account = await Staff.findOne({ email });
    }

    if (!account) {
      return res.status(400).json({ msg: "Invalid email" });
    }

    /// ================= BLOCK CHECK =================
    if (account.status === false) {
      return res.status(403).json({ msg: "Account blocked" });
    }

    /// ================= PASSWORD MATCH =================
    const match = await bcrypt.compare(password, account.password);

    if (!match) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    /// ================= JWT =================
    const token = jwt.sign(
      {
        id: account._id,
        role: account.role || "staff",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: account,
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

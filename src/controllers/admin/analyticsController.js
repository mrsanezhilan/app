const Transaction = require("../../models/Transaction");

exports.revenue = async (req, res) => {
  try {
    const data = await Transaction.aggregate([
      {
        $group: {
          _id: "$date",
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

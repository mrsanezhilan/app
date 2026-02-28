const router = require("express").Router();
const auth = require("../../middleware/authMiddleware");
const { authorize } = require("../../middleware/roleMiddleware");

const analytics = require("../../controllers/admin/analyticsController");

// Revenue analytics
router.get("/revenue", auth, authorize("admin"), analytics.revenue);

module.exports = router;

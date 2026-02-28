const router = require("express").Router();
const auth = require("../../middleware/authMiddleware");
const { authorize } = require("../../middleware/roleMiddleware");

const security = require("../../controllers/admin/securityController");

// Get audit logs
router.get("/logs", auth, authorize("admin"), security.getLogs);

module.exports = router;

const express = require("express");
const router = express.Router();

const auth = require("../../middleware/authMiddleware");
const role = require("../../middleware/roleMiddleware");
const staffController = require("../../controllers/admin/staffController");

router.post("/", auth, role.authorize("admin"), staffController.addStaff);
router.get("/", auth, role.authorize("admin"), staffController.getStaff);
router.patch("/:id", auth, role.authorize("admin"), staffController.updateStaff);
router.delete("/:id", auth, role.authorize("admin"), staffController.deleteStaff);

module.exports = router;

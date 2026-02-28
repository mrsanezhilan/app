const router = require("express").Router();
const auth = require("../../middleware/authMiddleware");
const { authorize } = require("../../middleware/roleMiddleware");
const slot = require("../../controllers/admin/slotController");

router.post("/", auth, authorize("admin"), slot.createSlot);
router.get("/", auth, authorize("admin"), slot.getSlots);
router.patch("/:id", auth, authorize("admin"), slot.updateSlot);
router.delete("/:id", auth, authorize("admin"), slot.deleteSlot);

module.exports = router;

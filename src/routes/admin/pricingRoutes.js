const router = require("express").Router();
const auth = require("../../middleware/authMiddleware");
const { authorize } = require("../../middleware/roleMiddleware");
const pricing = require("../../controllers/admin/pricingController");

router.post("/", auth, authorize("admin"), pricing.setPricing);
router.get("/", auth, authorize("admin"), pricing.getPricing);

module.exports = router;

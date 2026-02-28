const router = require("express").Router();
const auth = require("../../middleware/authMiddleware");
const { authorize } = require("../../middleware/roleMiddleware");

const user = require("../../controllers/admin/userController");

router.get("/", auth, authorize("admin"), user.getUsers);
router.patch("/block/:id", auth, authorize("admin"), user.blockUser);
router.patch("/unblock/:id", auth, authorize("admin"), user.unblockUser);

module.exports = router;

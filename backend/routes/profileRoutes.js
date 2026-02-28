const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../controllers/uploadMiddleware");
const {
  createProfile,
  getAllProfiles,
  updateProfiles,
  DeleteProfiles,
  getProfileById
} = require("../controllers/profilesController");

router.post("/", authMiddleware, upload.single("profileImage"), createProfile);

router.get("/", getAllProfiles);
router.get("/:id", authMiddleware, getProfileById);

router.put(
  "/:id",
  authMiddleware,
  upload.single("profileImage"),
  updateProfiles,
);

router.delete("/:id",authMiddleware,DeleteProfiles)

module.exports = router;

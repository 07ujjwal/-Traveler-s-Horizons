const express = require("express");
const {
  registerUser,
  loginUser,
  updateProfile,
  userProfile,
  uplodeProfilePicture,
} = require("../controllers/userController");

const { authGuard } = require("../Middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authGuard, userProfile);
router.put("/updateProfile", authGuard, updateProfile);
router.put("/updateProfilePicture", authGuard, uplodeProfilePicture);

module.exports = router;

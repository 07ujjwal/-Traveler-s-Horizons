const express = require("express");
const {
  createCity,
  getAllcities,
  getCity,
  deleteCity,
} = require("../controllers/cityController");

const { authGuard } = require("../Middlewares/authMiddleware");

const router = express.Router();

router.post("/", authGuard, createCity);
router.get("/", authGuard, getAllcities);
router.get("/:id", authGuard, getCity);
router.delete("/:id", authGuard, deleteCity);

module.exports = router;

const City = require("../models/City");

const createCity = async function (req, res) {
  try {
    const cityData = {
      ...req.body,
      user: req.user._id,
    };

    const result = await City.create(cityData);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllcities = async function (req, res) {
  try {
    const cities = await City.find({ user: req.user._id });

    return res.json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCity = async function (req, res) {
  try {
    //const city = await City.findOne({ id: req.params.id });

    const city = await City.findOne({
      id: req.params.id,
      user: req.user._id,
    }).populate([{ path: "user", select: "name" }]);

    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.json(city);
  } catch (error) {
    console.error("Mongoose error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid city ID format" });
    }

    res.status(500).json({ error: error.message });
  }
};

const deleteCity = async function (req, res) {
  try {
    const result = await City.deleteOne({ id: req.params.id });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCity, getAllcities, getCity, deleteCity };

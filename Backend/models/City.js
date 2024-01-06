const mongoosh = require("mongoose");
const getNextSequenceValue = require("../utils/seguenceGenerator");

const CitySchema = new mongoosh.Schema(
  {
    user: {
      type: mongoosh.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cityName: {
      type: String,
    },

    country: {
      type: String,
    },

    emoji: {
      type: String,
    },
    date: {
      type: Date,
    },

    notes: {
      type: String,
    },

    position: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },

    id: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

CitySchema.pre("save", async function (next) {
  if (!this.id) {
    this.id = await getNextSequenceValue("cityId");
  }
  next();
});

const City = mongoosh.model("City", CitySchema);

module.exports = City;

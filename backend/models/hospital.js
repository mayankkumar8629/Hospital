const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  specialties: {
    type: [String],
    required: true,
  }, // Array of medical specialties
  ratings: {
    type: [Number],
    default: [],
  }, // Stores user ratings
  imageUrl: {
    type: String,
    required: true,
  }, // URL of the hospital's image
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;

const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    skills: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      default: "Pending",
    },

    role: {
      type: String,
      default: "Volunteer",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Volunteer", volunteerSchema);
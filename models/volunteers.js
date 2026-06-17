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
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email"
    ]
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
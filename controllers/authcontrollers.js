const Volunteer = require("../models/Volunteers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingVolunteer = await Volunteer.findOne({ email });

    if (existingVolunteer) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const volunteer = await Volunteer.create({
      name,
      email,
      password: hashedPassword,
      phone,
      status: role === "Admin"? "Approved" : "Pending"
    });

    res.status(201).json({
      message: "Volunteer registered successfully",
      volunteer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const volunteer = await Volunteer.findOne({ email });

    if (!volunteer) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      volunteer.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: volunteer._id,
        role: volunteer.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: volunteer.role
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { register , login};
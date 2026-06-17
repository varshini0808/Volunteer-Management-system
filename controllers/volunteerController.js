const Volunteer = require("../models/Volunteers");

const getProfile = async (req, res) => {
  try {

    const volunteer = await Volunteer.findById(
      req.user.id
    ).select("-password");

    res.status(200).json(volunteer);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateProfile = async (req, res) => {
  try {

    const { phone, skills } = req.body;

    const volunteer =
      await Volunteer.findById(req.user.id);

    if (!volunteer) {
      return res.status(404).json({
        message: "Volunteer not found"
      });
    }

    volunteer.phone = phone || volunteer.phone;

    volunteer.skills = skills || volunteer.skills;

    await volunteer.save();

    res.status(200).json({
      message: "Profile updated successfully",
      volunteer
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getAllVolunteers = async (req, res) => {
  try {

    const volunteers =
      await Volunteer.find({role: "Volunteer"}).select("-password");

    res.status(200).json(volunteers);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const approveVolunteer = async (req, res) => {
  try {

    const volunteer =
      await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({
        message: "Volunteer not found"
      });
    }

    volunteer.status = "Approved";

    await volunteer.save();

    res.status(200).json({
      message: "Volunteer approved successfully",
      volunteer
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deleteVolunteer = async (req, res) => {
  try {

    const volunteer =
      await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({
        message: "Volunteer not found"
      });
    }

    await Volunteer.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Volunteer deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getDashboard = async (req, res) => {
  try {

    const totalVolunteers =
      await Volunteer.countDocuments({role:"Volunteer"});

    const approvedVolunteers =
      await Volunteer.countDocuments({
        role : "Volunteer",
        status: "Approved"
      });

    const pendingVolunteers =
      await Volunteer.countDocuments({
        role : "Volunteer",
        status: "Pending"
      });

    res.status(200).json({
      totalVolunteers,
      approvedVolunteers,
      pendingVolunteers
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { getProfile , updateProfile , getAllVolunteers , approveVolunteer , deleteVolunteer , getDashboard };
const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const { getProfile , updateProfile , getAllVolunteers , approveVolunteer , deleteVolunteer , getDashboard } = require("../controllers/volunteerController");

router.get( "/profile", protect, getProfile );
router.put( "/profile", protect, updateProfile );
router.get( "/", protect, adminOnly, getAllVolunteers );
router.get( "/:id/approve", protect, adminOnly, approveVolunteer );
router.delete( "/:id", protect, adminOnly, deleteVolunteer );
router.get( "/dashboard", protect, adminOnly, getDashboard );

module.exports = router;
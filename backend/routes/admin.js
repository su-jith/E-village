// routes/admin.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const User = require("../models/User");
const Ward = require("../models/Ward");



// Protected route accessible only by admin users
router.get('/dashboard', auth, role('admin'), (req, res) => {
  res.json({ msg: 'Welcome to the admin dashboard' });
});

// GET /api/admin/employees - returns a list of employees
router.get("/employees", async (req, res) => {
  try {
    // Fetch only users with role "employee"
    const employees = await User.find({ role: "employee" });
    res.json({ employees });
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Endpoint to assign a ward to an employee
router.delete("/assign-ward/:employeeId", async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await User.findOne({ _id: employeeId, role: "employee" });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    employee.ward = null;
    await employee.save();
    res.json({ message: "Assignment deleted successfully!" });
  } catch (error) {
    console.error("Error deleting assignment:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// backend/routes/admin.js
router.post("/assign-ward", async (req, res) => {
  try {
    const { employeeId, ward } = req.body;
    if (!employeeId || !ward) {
      return res.status(400).json({ message: "Employee ID and ward are required." });
    }
    // Convert ward to a number (if your model uses Number)
    const wardNumber = Number(ward);
    if (isNaN(wardNumber) || wardNumber <= 0) {
      return res.status(400).json({ message: "Invalid ward number." });
    }
    // Verify that the ward exists in the Ward collection
    const wardData = await Ward.findOne({ wardNumber: wardNumber });
    if (!wardData) {
      return res.status(400).json({ message: "The selected ward does not exist." });
    }
    // Check that no other employee already has this ward assigned
    const duplicate = await User.findOne({ ward: wardNumber, role: "employee", _id: { $ne: employeeId } });
    if (duplicate) {
      return res.status(400).json({ message: "This ward is already assigned to another employee." });
    }
    const employee = await User.findOne({ _id: employeeId, role: "employee" });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    employee.ward = wardNumber;
    await employee.save();
    res.json({ message: "Ward assigned successfully!" });
  } catch (error) {
    console.error("Error assigning ward:", error);
    res.status(500).json({ message: "Server error." });
  }
});




module.exports = router;

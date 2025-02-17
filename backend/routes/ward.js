const express = require("express");
const router = express.Router();
const Ward = require("../models/Ward");

// GET all wards
router.get("/", async (req, res) => {
  try {
    const wards = await Ward.find({});
    res.json({ wards });
  } catch (error) {
    console.error("Error fetching wards:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST new ward
// In backend/routes/admin.js (or ward.js)
router.post("/assign-ward", async (req, res) => {
  try {
    const { employeeId, ward } = req.body;
    if (!employeeId || !ward) {
      return res.status(400).json({ message: "Employee ID and ward are required." });
    }
    // Check that the ward exists in the Ward collection
    const wardData = await Ward.findOne({ wardNumber: ward });
    if (!wardData) {
      return res.status(400).json({ message: "The selected ward does not exist." });
    }
    // Check that no other employee has this ward assigned
    const duplicate = await User.findOne({ ward, role: "employee", _id: { $ne: employeeId } });
    if (duplicate) {
      return res.status(400).json({ message: "This ward is already assigned to another employee." });
    }
    const employee = await User.findOne({ _id: employeeId, role: "employee" });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }
    employee.ward = ward;
    await employee.save();
    res.json({ message: "Ward assigned successfully!" });
  } catch (error) {
    console.error("Error assigning ward:", error);
    res.status(500).json({ message: "Server error." });
  }
});


// PUT update ward
router.put("/:id", async (req, res) => {
  try {
    const { wardNumber, numberOfHouses, wardMember } = req.body;
    // Check for duplicate wardNumber (exclude current ward)
    const duplicate = await Ward.findOne({ wardNumber, _id: { $ne: req.params.id } });
    if (duplicate) {
      return res.status(400).json({ message: "Ward already exists." });
    }
    const updatedWard = await Ward.findByIdAndUpdate(
      req.params.id,
      { wardNumber, numberOfHouses, wardMember },
      { new: true }
    );
    if (!updatedWard) {
      return res.status(404).json({ message: "Ward not found." });
    }
    res.json({ message: "Ward updated successfully!", ward: updatedWard });
  } catch (error) {
    console.error("Error updating ward:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// DELETE ward
router.delete("/:id", async (req, res) => {
  try {
    const deletedWard = await Ward.findByIdAndDelete(req.params.id);
    if (!deletedWard) {
      return res.status(404).json({ message: "Ward not found." });
    }
    res.json({ message: "Ward deleted successfully!" });
  } catch (error) {
    console.error("Error deleting ward:", error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;

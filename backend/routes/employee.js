// routes/employee.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Dummy endpoint for employee dashboard
router.get('/profile', auth, role('employee'), (req, res) => {
  res.json({ msg: "Employee dashboard working!" });
});

module.exports = router;

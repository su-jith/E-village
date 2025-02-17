// routes/family.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const {
  createOrUpdateFamily,
  getFamilyByHouseNumber,
  getFamiliesByWard
} = require('../controllers/familyController');

// Only employees (or admin) can create or update family records.
// Here, we assume employees will handle this.
router.post('/', auth, role('employee'), createOrUpdateFamily);

// Get families for a specific ward (e.g., for overview purposes)
router.get('/ward/:ward', auth, getFamiliesByWard);

// Get a family record by house number
router.get('/:houseNumber', auth, getFamilyByHouseNumber);

module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.send('Welcome to Nursing Placement Scheduler API v1');
});

router.use('/users', require('./users'));
router.use('/sessions', require('./sessions'));
router.use('/students', require('./students'));
router.use('/sites', require('./sites'));
router.use('/instructors', require('./instructors'));
router.use('/placements', require('./placements'));
router.use('/placement-opportunities', require('./placementOpportunities'));
router.use('/school-sessions', require('./schoolSessions'));

module.exports = router;
const router = require('express').Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Promote user to admin
router.post('/promote', auth, async (req, res) => {
  if (req.user.role !== 'super_admin') return res.status(403).send('Forbidden');
  
  const user = await User.findByIdAndUpdate(
    req.body.userId,
    { role: 'admin' },
    { new: true }
  );
  
  res.json(user);
});

// Remove admin privileges
router.post('/demote', auth, async (req, res) => {
  if (req.user.role !== 'super_admin') return res.status(403).send('Forbidden');
  
  const user = await User.findByIdAndUpdate(
    req.body.userId,
    { role: 'user' },
    { new: true }
  );
  
  res.json(user);
});

module.exports = router;
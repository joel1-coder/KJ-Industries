const express = require('express');
const router = express.Router();

// Placeholder auth routes — will be expanded with DB integration
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // TODO: Replace with real DB auth
  if (email === 'admin@precision.dev' && password === 'admin123') {
    res.json({ success: true, message: 'Login successful', token: 'placeholder-jwt-token', user: { email, role: 'admin' } });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

router.post('/register', (req, res) => {
  // TODO: Implement with DB
  res.json({ success: true, message: 'Registration endpoint ready' });
});

router.get('/me', (req, res) => {
  // TODO: JWT verification
  res.json({ success: true, message: 'Profile endpoint ready' });
});

module.exports = router;

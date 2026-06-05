const express = require('express');
const router = express.Router();

// In-memory store for contact submissions (replace with DB later)
const submissions = [];

router.post('/', (req, res) => {
  const { name, email, mobile, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
  }

  const entry = {
    id: Date.now(),
    name,
    email,
    mobile: mobile || '',
    subject: subject || 'Project Inquiry',
    message,
    receivedAt: new Date().toISOString(),
    to: 'kjindus70@gmail.com',
  };

  submissions.push(entry);

  console.log('\n📩 New contact submission:');
  console.log(`   From: ${name} <${email}>`);
  console.log(`   Subject: ${entry.subject}`);
  console.log(`   Message: ${message.substring(0, 80)}...`);
  console.log(`   Saved to: kjindus70@gmail.com\n`);

  res.json({
    success: true,
    message: 'Your message has been received. We will get back to you shortly!',
    data: { id: entry.id, receivedAt: entry.receivedAt },
  });
});

// View all submissions (admin only — protect with auth later)
router.get('/', (req, res) => {
  res.json({ success: true, total: submissions.length, data: submissions });
});

module.exports = router;

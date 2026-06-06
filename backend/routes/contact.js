const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// In-memory store for contact submissions (replace with DB later)
const submissions = [];

// Create Transporter using Env Variables
const createTransporter = () => {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.log('⚠️ [Mailer] SMTP credentials not configured. Contact messages will not be emailed.');
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_SECURE !== 'false', // true for 465, false for 587
    auth: { user, pass }
  });
};

router.post('/', async (req, res) => {
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
    to: process.env.CONTACT_RECEIVER || 'kjindus70@gmail.com',
  };

  submissions.push(entry);

  console.log('\n📩 New contact submission:');
  console.log(`   From: ${name} <${email}>`);
  console.log(`   Subject: ${entry.subject}`);
  console.log(`   Message: ${message.substring(0, 80)}...`);

  // Attempt to send email
  const transporter = createTransporter();
  let emailSent = false;
  let emailError = null;

  if (transporter) {
    const mailOptions = {
      from: `"${name} (via Precision)" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: entry.to,
      subject: `[Precision Inquiry] ${entry.subject}`,
      text: `New contact submission received from your website:\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Mobile: ${entry.mobile}\n` +
            `Subject: ${entry.subject}\n\n` +
            `Message:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #00e5ff; border-bottom: 1px solid #ddd; padding-bottom: 10px;">New Contact Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Mobile:</strong> ${entry.mobile}</p>
          <p><strong>Subject:</strong> ${entry.subject}</p>
          <div style="background: #f9f9f9; border-left: 4px solid #00e5ff; padding: 15px; margin-top: 20px;">
            <p style="margin: 0; font-weight: bold;">Message:</p>
            <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #eee; margin-top: 30px;" />
          <p style="font-size: 12px; color: #999;">This email was sent automatically from your Precision Website.</p>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`   ✅ Email successfully sent to: ${entry.to}`);
      emailSent = true;
    } catch (err) {
      console.error(`   ❌ Failed to send email:`, err.message);
      emailError = err.message;
    }
  } else {
    // Fallback: Send email via free Formsubmit.co endpoint immediately without credentials
    try {
      console.log(`   ✉️ Attempting to forward email via Formsubmit.co to: ${entry.to}...`);
      const response = await fetch(`https://formsubmit.co/ajax/${entry.to}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Mobile: entry.mobile,
          Subject: entry.subject,
          Message: message,
          _honey: "", // Honeypot field for spam prevention
          _subject: `[Precision Website Inquiry] ${entry.subject}`
        })
      });

      const result = await response.json();
      if (response.ok) {
        console.log(`   ✅ Email successfully forwarded via Formsubmit.co!`);
        emailSent = true;
      } else {
        console.error(`   ❌ Formsubmit.co responded with error:`, result.message);
        emailError = result.message || 'Formsubmit error';
      }
    } catch (err) {
      console.error(`   ❌ Failed to forward email via Formsubmit.co:`, err.message);
      emailError = err.message;
    }
  }

  res.json({
    success: true,
    message: emailSent 
      ? 'Your message has been sent to our team successfully!' 
      : 'Your message has been received! (Email notification pending server SMTP configuration).',
    emailSent,
    emailError,
    data: { id: entry.id, receivedAt: entry.receivedAt },
  });
});

// View all submissions (admin only — protect with auth later)
router.get('/', (req, res) => {
  res.json({ success: true, total: submissions.length, data: submissions });
});

module.exports = router;

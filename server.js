const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

const transporter = nodemailer.createTransport({
  service: 'your-email-provider', // e.g., 'Gmail', 'Yahoo', etc.
  auth: {
    user: 'your-email@example.com',
    pass: 'your-email-password',
  },
});

app.post('/send-email', (req, res) => {
  const mailOptions = {
    from: 'your-email@example.com',
    to: 'recipient@example.com',
    subject: 'Your Subject',
    text: 'Your email content goes here.',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ success: false, error: error.message });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ success: true, message: 'Email sent successfully' });
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

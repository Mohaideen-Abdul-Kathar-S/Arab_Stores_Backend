// sendOTP.js (or inside your controller)
const nodemailer = require('nodemailer');

const sendOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit

  // Create reusable transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use 'hotmail', 'yahoo', etc.
    auth: {
      user: 'forstudying921@gmail.com',       // replace with your email
      pass: 'snmfdxflsplnynlh'      // use an app-specific password
    }
  });

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent to:", email);
    res.status(200).json({ message: "OTP sent", otp }); // send otp back for testing (remove in prod)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

module.exports = sendOTP;

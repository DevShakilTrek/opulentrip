import nodemailer from "nodemailer";

// Brevo SMTP transporter
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com", // Brevo SMTP server
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.STMP_USER, // Brevo SMTP user
    pass: process.env.STMP_PASS, // Brevo SMTP password
  },
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ Nodemailer failed to initialize:", error);
  } else {
    console.log("✅ Nodemailer is ready to send emails");
  }
});

export default transporter;

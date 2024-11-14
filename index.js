// app.js

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
//  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "bettyhardyyyy@gmail.com",
    pass: "zkdjdkduaynyzicu",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Helper function to convert the message object to HTML
function formatMessageToHTML(message) {
  let html = "<table>";
  for (const [key, value] of Object.entries(message)) {
    html += `<tr><td><strong>${key}:</strong></td><td>${value}</td></tr>`;
  }
  html += "</table>";
  return html;
}

// Endpoint to send email
app.post("/send-email", async (req, res) => {
  const {message, subject} = req.body;

  // Validate request body
  if (!message || !subject) {
    return res.status(400).json({error: "Please provide message and subject."});
  }

  try {
    const info = await transporter.sendMail({
      from: "bettyhardyyyy@gmail.com", // Sender email address
      to: "bettyhardyyyy@gmail.com", // Recipient email address
      subject,
      text: "Details",
      html: `
        <h3>Message Details:</h3>
        ${formatMessageToHTML(message)}
      `,
    });

    res
      .status(200)
      .json({message: "Email sent successfully!"});
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({error: "Failed to send email"});
  }
});

const PORT = 2700;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

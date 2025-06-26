const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Load .env file
dotenv.config();

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // Required to read JSON body from POST

// Route to check server is alive
app.get("/", (req, res) => {
  res.send("Server is up!");
});

// Contact form route
app.post("/send-email", async (req, res) => {
  try {
    console.log("📥 Form submission received");

    const { name, email, message } = req.body;

    // Validate inputs
    if (!name || !email || !message) {
      console.log("❌ Missing fields:", req.body);
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    // Create mail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Mail options
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      subject: `New message from ${name}`,
      html: `
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully");
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Error in /send-email route:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

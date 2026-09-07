const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const emailUser = process.env.EMAIL_USER || process.env.GMAIL_USER;
const emailPass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;

app.use(express.json({ limit: "20kb" }));
app.use(express.static(__dirname));

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: emailUser,
        pass: emailPass
    }
});

app.post("/api/contact", async (req, res) => {
    const { name, email, phone, message } = req.body;
    const nameValue = typeof name === "string" ? name.trim() : "";
    const emailValue = typeof email === "string" ? email.trim() : "";
    const phoneValue = typeof phone === "string" ? phone.trim() : "";
    const messageValue = typeof message === "string" ? message.trim() : "";

    if (!/^[A-Za-z][A-Za-z .'-]{1,49}$/.test(nameValue)) {
        return res.status(400).json({ error: "Enter a valid name" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailValue)) {
        return res.status(400).json({ error: "Enter a valid email" });
    }
    if (!/^\d{10}$/.test(phoneValue)) {
        return res.status(400).json({ error: "Phone number must be exactly 10 digits" });
    }
    if (!messageValue || messageValue.length > 1000) {
        return res.status(400).json({ error: "Message is required and must be under 1000 characters" });
    }

    try {
        await transporter.sendMail({
            from: emailUser,
            to: process.env.MAIL_TO || emailUser,
            replyTo: emailValue,
            subject: `Portfolio message from ${nameValue}`,
            text: `Name: ${nameValue}\nEmail: ${emailValue}\nPhone: ${phoneValue}\n\nMessage:\n${messageValue}`
        });
        res.json({ success: true });
    } catch (error) {
        console.error("Contact email error:", error.message);
        res.status(500).json({ error: "Message send nahi ho saka. Please try again." });
    }
});

app.listen(port, () => {
    console.log(`Portfolio running at http://localhost:${port}`);
});

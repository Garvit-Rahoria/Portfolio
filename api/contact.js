const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, phone, message } = req.body || {};
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
        return res.status(400).json({
            error: "Phone number must be exactly 10 digits"
        });
    }

    if (!messageValue || messageValue.length > 1000) {
        return res.status(400).json({
            error: "Message is required and must be under 1000 characters"
        });
    }

    const emailUser = process.env.EMAIL_USER || process.env.GMAIL_USER;
    const emailPass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;

    if (!emailUser || !emailPass) {
        console.error("Missing email environment variables");
        return res.status(500).json({
            error: "Email service is not configured"
        });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: emailUser,
                pass: emailPass
            }
        });

        await transporter.sendMail({
            from: emailUser,
            to: process.env.MAIL_TO || emailUser,
            replyTo: emailValue,
            subject: `Portfolio message from ${nameValue}`,
            text: `Name: ${nameValue}\nEmail: ${emailValue}\nPhone: ${phoneValue}\n\nMessage:\n${messageValue}`
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Contact email error:", error);
        return res.status(500).json({
            error: "Message send nahi ho saka. Please try again."
        });
    }
};

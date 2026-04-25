import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL
  auth: {
    type: "login", // Forces login type authentication
    // user: process.env.EMAIL_USER,
    // pass: process.env.EMAIL_PASS,
    user: "sanskarsanas2611@gmail.com",
    pass: "nfengczekigbdygj"
  },
});

export const sendEmail = async (email, subject, message) => {
console.log("EMAIL:", process.env.EMAIL_USER);
console.log("PASS:", process.env.EMAIL_PASS);
  try {
    const info = await transporter.sendMail({
      from: `"All Is Well NGO ❤️" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      text: message,
    });

    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Email failed:", error);
  }
};
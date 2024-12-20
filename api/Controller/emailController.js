const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "Thank You for Subscribing to Our Job Alerts!",
    text: `Dear Subscriber,

We are thrilled to welcome you to Our Job Portal!

Thank you for subscribing to our job alert service. We are delighted to have you on board and are committed to helping you find the perfect job opportunity. As a subscriber, you will receive personalized job recommendations directly to your inbox, tailored to your preferences and interests.

Here's what you can expect from us:
- Timely Updates: We will keep you informed about the latest job openings that match your profile.
- Personalized Recommendations: Receive job suggestions based on your preferences.
- Expert Tips & Resources: Get tips and resources to enhance your job search journey.

We encourage you to visit your profile and update your job preferences to ensure we deliver the most relevant opportunities for you. 

Feel free to contact us at [Your Contact Email] if you have any questions or need assistance. We're here to help you every step of the way.

Thank you once again for choosing [Your Job Portal Name]. We look forward to supporting your career journey!

Best regards,

Admin
Team,Mail
XXXXXXX887`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Email could not be sent.");
    } else {
      console.log("Email sent successfully!");
      res.status(200).send("Email sent successfully!");
    }
  });
});

module.exports = { sendEmail };
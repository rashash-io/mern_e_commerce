import dotenv from 'dotenv';
dotenv.config()
import nodemailer from 'nodemailer'

//let transporter = nodemailer.createTransport(transport[, defaults])

const transporter = nodemailer.createTransport({
 
  host:  process.env.NODEMAILER_SMTP_HOST,
  port:process.env.NODEMAILER_SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL_ADDRESS,
    pass: process.env.NODEMAILER_EMAIL_PASSWORD,
  },
});

const mailOptions = {
  from: process.env.NODEMAILER_EMAIL_ADDRESS,
  to: "info@rashash.io",
  subject: "Hello from Nodemailer",
  text: "This is a test email sent using Nodemailer.",
};

export const sendTestMail = () =>{

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
}



// transporter is going to be an object that is able to send mail
// transport is the transport configuration object, connection url or a transport plugin instance
// defaults is an object that defines default values for mail options
// You have to create the transporter object only once. If you already have a transporter object you can use it to send mail as much as you like.
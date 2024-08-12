import nodemailer from "nodemailer";

import { SMTP_FROMMAIL, SMTP_PASSWORD } from "../config/config";

const sendEmail = async (to: string, url: string, txt: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: SMTP_FROMMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    const res = await transporter.sendMail({
      from: SMTP_FROMMAIL,
      to: to,
      subject: "Hello",
      html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the LCL Auth.</h2>
            <p>Congratulations! You're almost set to start.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
        `,
    });
    console.log(res);
  } catch (err) {
    console.warn(err);
  }
};

export default sendEmail;
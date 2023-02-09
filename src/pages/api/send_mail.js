import Mailgen from "mailgen";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  try {
    let config = {
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    };

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Mailgen",
        link: "https://mailgen.js/",
      },
    });

    let response = {
      body: {
        name: !req.body.passwordResetBoolean ? req.body.username : "",
        intro: !req.body.passwordResetBoolean
          ? "Welcome to MyUnsplash! We're very excited to have you on board."
          : "Seems like you forgot your password for MyUnsplash.com!",
        action: {
          instructions: !req.body.passwordResetBoolean
            ? "To get started with MyUnsplash, please enter this OTP to activate your Account:"
            : "To reset your password on MyUnsplash, please enter this OTP below:",
          button: {
            color: "#3db46d",
            text: req.body.otp,
          },
        },
        outro: !req.body.passwordResetBoolean
          ? "Need help, or have questions? Just reply to this email, we'd love to help."
          : "If you did not request a password reset, you can safely ignore this email. Only a person",
      },
    };

    let mail = MailGenerator.generate(response);

    let toPerson = req.body.passwordResetBoolean
      ? req.body.passwordResetUserEmail
      : req.body.userEmail;

    let message = {
      from: process.env.NODEMAILER_EMAIL,
      to: toPerson,
      subject: req.body.passwordResetBoolean
        ? "Password Reset Request"
        : "Activate MyUnsplash Account",
      html: mail,
    };

    let info = await transporter.sendMail(message);

    return res.status(201).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong! Try again later.",
      error: error,
    });
  }
}

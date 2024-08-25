import ejs from "ejs";
import nodemailer from "nodemailer";
import ApiError from "../utils/apiError.js";

// Render Email Template
const renderEmailTemplate = async (templatePath, data) => {
  try {
    const renderedTemplate = await ejs.renderFile(templatePath, data);
    return renderedTemplate;
  } catch (error) {
    throw new Error(`Error rendering email template: ${error.message}`);
  }
};

// Transporter (Setting up SMTP details)
export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Sending Password Reset Email
export const sendPasswordResetEmail = async (
  sendTo,
  username,
  resetPasswordCode
) => {
  const appUrl = `${process.env.APP_URL}:${process.env.PORT}`;

  const passwordResetData = {
    email: sendTo,
    username,
    resetLink: `${appUrl}/api/users/forgot-password-request?token=${resetPasswordCode}`,
  };

  try {
    const emailTemplate = await renderEmailTemplate(
      "src/templates/emailer/password-reset.ejs",
      passwordResetData
    );

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: sendTo,
      subject: "The Resumes Online - Reset Your Password",
      html: emailTemplate,
    });
    return info;
  } catch (error) {
    throw new ApiError(500, `Error sending Email :: ${error}`);
  }
};

// Sending Contact Email
export const sendContactEmail = async (contact) => {
  const contactData = {
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    message: contact.message,
  };

  try {
    // Email template for receiver
    const emailReceivedTemplate = await renderEmailTemplate(
      "src/templates/emailer/contact/recieved.ejs",
      contactData
    );

    // Email template for sender
    const emailConfirmationTemplate = await renderEmailTemplate(
      "src/templates/emailer/contact/confirmation.ejs",
      contactData
    );

    // Send email to receiver
    const infoReceiver = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "rahul.yadav@valuepitch.com",
      cc: ["theresumes.online@gmail.com"],
      subject: "The Resumes Online - New Contact Form Submission",
      html: emailReceivedTemplate,
    });

    // Send confirmation email to sender
    const infoSender = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: contact.email,
      subject: "The Resumes Online - We Received Your Enquiry",
      html: emailConfirmationTemplate,
    });

    return { infoReceiver, infoSender };
  } catch (error) {
    throw new ApiError(500, `Error sending Email :: ${error.message}`);
  }
};

// Welcome Email
export const welcomeEmail = async (user) => {
  const userData = {
    _id: user._id,
    name: user.fullName,
    email: user.email,
  };

  try {
    // Email template
    const emailTemplate = await renderEmailTemplate(
      "src/templates/emailer/welcome.ejs",
      userData
    );

    // Send Email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "The Resumes Online - Welcome",
      html: emailTemplate,
    });

    return info;
  } catch (error) {
    throw new ApiError(500, `Error sending Email :: ${error.message}`);
  }
};

// import { Resend } from "resend";


// const resend = new Resend(process.env.RESEND_API_KEY);


const domain = process.env.NEXT_PUBLIC_APP_URL;
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // service: 'Gmail',
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
  }});

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string
) => {
  // await resend.emails.send({
  //   from: "onboarding@resend.dev",
  //   to: email,
  //   subject: "2FA Code",
  //   html: `<p>Your 2FA code: ${token}</p>`
  // });
  await transporter.sendMail({
    from: `Shivam Gupta <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`
  }, function (error:any, info:any) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
  }
  );
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string,
) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`


  // await resend.emails.send({
  //   from: "onboarding@resend.dev",
  //   to: email,
  //   subject: "Reset your password",
  //   html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
  // });
  await transporter.sendMail({
    from: `Shivam Gupta <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`
  }, function (error:any, info:any) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
  }
  );
};

export const sendVerificationEmail = async (
  email: string, 
  token: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;


  // await resend.emails.send({
  //   from: "onboarding@resend.dev",
  //   to: email,
  //   subject: "Confirm your email",
  //   html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
  // });

  await transporter.sendMail({
    from: `Shivam Gupta <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
  }, function (error:any, info:any) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
  }
  );
};
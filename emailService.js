import nodemailer from "nodemailer";
const sendSimpleEmail = async (dataSend) => {
  // create reusable transporter object using the default SMTP transport

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated eethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"tin phan cr7 👻" <foo@example.com>', // sender address
    to: dataSend?.userInfo?.email, // list of receivers
    subject: "Thông tin dịch vụ máy chủ VPS", // Subject line
    text: "Hello world?", // plain text body
    html: emailBodyHtml(dataSend), // html body
  });
};

const emailBodyHtml = (dataSend) => {
  let result = `
    <h3>Dear customer, ${dataSend?.userInfo?.firstName} ${dataSend?.userInfo?.lastName} !</h3>
    <p>Thank you very much for using VPS of CloudyWays </p>
    <p>Your vps purchase information is as follows:</p>
    <div><b>Name:    ${dataSend?.product?.title}</b></div>
    <div><b>CPU:   ${dataSend?.product?.core}</b></div>
    <div><b>Ram:     ${dataSend?.product?.ram}</b></div>
    <div><b>SSD:     ${dataSend?.product?.ssd}</b></div>
    <p>Registration successful! Within 24 hours, the payment invoice along with instructions will be sent to your email. Thank you for trusting and using our services.</p>
   
    <p>Best regards!</p>

    `;
  return result;
};
export default sendSimpleEmail;

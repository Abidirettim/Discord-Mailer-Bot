const nodemailer = require("nodemailer")


const getMailConfigurate = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    }
  })
}

exports.sendMail = async (receivedMail, issue, text) => {
  let transporter = getMailConfigurate()

  return transporter.sendMail({
    from: process.env.EMAIL,
    to: receivedMail,
    subject: issue,
    text: text
  })
}
import nodemailer from 'nodemailer'


export const getMailConfigurate = () => {
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

export const sendMail = async (receivedMail: string, issue: string, text: string) => {
  let transporter = getMailConfigurate()

  return transporter.sendMail({
    from: process.env.EMAIL,
    to: receivedMail,
    subject: issue,
    text: text
  })
}
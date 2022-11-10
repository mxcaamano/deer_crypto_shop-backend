const { createTransport } = require('nodemailer')

const mail = process.env.TEST_MAIL
const pass = process.env.TEST_MAIL_PASS
// const TEST_MAIL = 'shirley99@ethereal.email'
// const TEST_MAILPASS = 'hd1cNMDh7vHcpTbSut'

const transporter = createTransport({
   host: 'smtp.ethereal.email',
   port: 587,
   auth: {
       user: mail,
       pass: pass
   },
   tls : { rejectUnauthorized: false }
})

module.exports = transporter
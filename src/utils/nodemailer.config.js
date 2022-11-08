const { createTransport } = require('nodemailer')

const TEST_MAIL = 'shirley99@ethereal.email'

const transporter = createTransport({
   host: 'smtp.ethereal.email',
   port: 587,
   auth: {
       user: TEST_MAIL,
       pass: 'hd1cNMDh7vHcpTbSut'
   },
   tls : { rejectUnauthorized: false }
})

module.exports = transporter
const twilio = require('twilio');

const accountSid = 'AC6419f8b1f6869c87a8a244f4535e888e';
const authToken = '01e1c1ea3c75da7cf37cb4fab6abd13d';

const client = twilio(accountSid, authToken);

async function sendPhoneMsg(body, from, to){
    try {
    const message = await client.messages.create({
        body: body,
        from: from,
        to: to
    })
    console.log(message)
    } catch (error) {
    console.log(error)
    }
}

module.exports = sendPhoneMsg
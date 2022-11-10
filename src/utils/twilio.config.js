const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

async function sendMsg(body, from, to){
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

module.exports = sendMsg
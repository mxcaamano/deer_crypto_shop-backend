const admin = require('firebase-admin');

const connectFire = async () => {
    try {
        const serviceAccount = require('./deercrypto-shop-backend-firebase-adminsdk-5wx5f-be024215d2.json');
        await admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://deercrypto-shop-backend.firebaseio.com/'
        })
        console.log('Firebase Database Connected')
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectFire
const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const url = 'mongodb+srv://admin:admin@cluster0.dbaqnvv.mongodb.net/ecommerce?retryWrites=true&w=majority'
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected')
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB
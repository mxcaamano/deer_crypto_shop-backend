const mongoose = require('mongoose')
const {DBURL} = require('../../config')
const logger = require('../utils/logger')

const connectMongo = async () => {
    try {
        const url = DBURL
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        logger.info('MongoDB connected')
    } catch (error) {
        logger.error(error)
    }
}

module.exports = connectMongo
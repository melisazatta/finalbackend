
import mongoose from 'mongoose'
import config from './config.js'

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUri)
        console.log("MongoDB Conectada")
    }catch (error) {
        console.error(error)
    }
}

export default connectDB
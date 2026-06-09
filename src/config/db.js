// import mongoose from 'mongoose'

// const connectDB = async () => {
//     try {
//         await mongoose.connect("mongodb://127.0.0.1/ecommerce")
//         console.log("DB Conectada")
//     }catch (error) {
//         console.error(error)
//     }
// }

// export default connectDB

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
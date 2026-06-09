import dotenv from "dotenv"

dotenv.config()

const config = {
    nodeEnv: process.env.NODE_ENV || "development",
    port: process.env.PORT || 8080,
    mongoUri: process.env.MONGO_URI 
    // || "mongodb+srv://melisazattaCoder:passwordfacil@cluster0.e0ow4zb.mongodb.net/ecommerce?appName=Cluster0"
}

export default config
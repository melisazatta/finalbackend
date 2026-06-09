import express from 'express'
import exphbs from 'express-handlebars'

import { loadCart } from './middlewares/loadCart.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'

import connectDB from './config/db.js'
import config from './config/config.js'
import methodOverride from 'method-override'
import { notFound, errorHandler } from './middlewares/errorHandler.js'

import { Server } from "socket.io";


const app = express()

connectDB()

app.use(express.static("./src/public"))

app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

//Routes 
app.use(loadCart)

app.use("/products", productRoutes)
app.get("/", (req, res) =>
    res.redirect("/products")
)

app.use("/cart", cartRoutes)

app.use(notFound)
app.use(errorHandler)



const server = app.listen(config.port, () => console.log(`https://localhost:${config.port}`))

export const io = new Server(server)
import config from "../config/config.js"


const notFound = (req, res, next) => {
    const error = new Error("Ruta no encontrada");
    error.status = 404
    next(error)

    console.log("404 =>", req.method, req.originalUrl)
    
}

const errorHandler = (err, req, res, next) => {
 if (err.status === 404) {
        return res.status(404).send(err.message)
    }

    console.error(err)

    res.status(500).send("Error interno del servidor")}


export {
    notFound,
    errorHandler
}
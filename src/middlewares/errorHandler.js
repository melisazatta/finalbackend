
const notFound = (req, res, next) => {
    
    console.log("404 =>", req.method, req.originalUrl)

    const error = new Error("Ruta no encontrada");
    error.status = 404
    next(error)
}

const errorHandler = (err, req, res, next) => {
    
    console.error(err)
    
 if (err.status === 404) {
        return res.status(404).send(err.message)
    }

    res.status(500).send("Error interno del servidor")}

export {
    notFound,
    errorHandler
}
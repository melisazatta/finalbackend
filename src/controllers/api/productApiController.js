import Product from "../../models/Product.js"
import { io } from "../../app.js";
import Cart from "../../models/Cart.js";

export async function getAllApi (req, res) {
    // Paginación
     let { limit = 10, page = 1, sort, query } = req.query

    limit = parseInt(limit)
    page = parseInt(page)

    // Filtro por categoría
    let filter = {}

    if (query === "available") {
    filter.stock = { $gt: 0 }
    } else if (query) {
    filter.category = query
    }

    // let filter = {}
    if (query) {
        filter.title = { $regex: query, $options: "i" }
    }

    // Ordenamiento
    let sortOption = {}
    if (sort === "asc") sortOption.price = 1
    if (sort === "desc") sortOption.price = -1

    // Total de products
    const totalProducts = await Product.countDocuments(filter)

    const totalPages = Math.ceil(totalProducts / limit)

    const skip = (page - 1) * limit

    console.log("GET products")
    const products = await Product.find(filter)
    .sort(sortOption)
    .limit(limit)
    .skip(skip)
    .lean()

    console.log(products)
    res.json({
    status: "success",
    payload: products,
    totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
    page,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    prevLink: page > 1
        ? `/api/products?page=${page - 1}&limit=${limit}`
        : null,
    nextLink: page < totalPages
        ? `/api/products?page=${page + 1}&limit=${limit}`
        : null
});
}

export async function createApi(req, res) {
    console.log("POST /products/create")
    try {
        if (req.body.thumbnails) {
    if (!Array.isArray(req.body.thumbnails)) {
        req.body.thumbnails = [req.body.thumbnails];
    }
} else {
    req.body.thumbnails = [];
}
        const product = await Product.create(req.body);

    res.status(201).json({
    status: "success",
    payload: product
    });
        
        const products = await Product.find().lean()

        io.emit("productsActualizados", products)

    } catch (error) {
    console.error(error);

    res.status(500).json({
        status: "error",
        message: error.message
    });
}
}
export async function updateApi(req, res) {
    console.log("PUT product")
    try{

if (!req.body) {
    return res.status(400).json({
        status: "error",
        message: "No se recibió body"
    });
}
        
        const product= await Product.findByIdAndUpdate(
        req.params.pid,
        req.body, {
            runValidators: true,
            new: true,
        } )


        if(!product){
            throw new Error("Product no encontrado")
        }

        const products = await Product.find().lean()

        io.emit("productsActualizados", products)
        res.json({
    status: "success",
    payload: product
});

    }catch (error) {
    console.log(error);

    res.status(500).json({
        status: "error",
        message: error.message
    });
}
}

export async function deleteProductApi(req, res) {
    console.log("DELETE product")
    await Product.findByIdAndDelete(req.params.pid)

    const products = await Product.find().lean()

     // Eliminar el product de todos los carritos
    await Cart.updateMany(
        {},
        {
            $pull: {
                products: {
                    product: req.params.id
                }
            }
        }
    )

        io.emit("productsActualizados", products)

    res.json({
    status: "success",
    message: "Producto eliminado"
});
}

export async function getByIdApi(req, res) {

    const product = await Product.findById(req.params.pid).lean();

    if (!product) {
        return res.status(404).json({
            status: "error",
            message: "Producto no encontrado"
        });
    }

    res.json({
        status: "success",
        payload: product
    });
}
import Product from "../models/Product.js"
import { io } from "../app.js";
import Cart from "../models/Cart.js";

export async function getAll (req, res) {
    // Paginación
     let { limit = 10, page = 1, sort, query } = req.query

    limit = parseInt(limit)
    page = parseInt(page)

    // Filtro por categoría
    let filter = {}
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
    res.render("products/list", {products,
         page,
        totalPages,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
        query,
        sort
    })
}

export async function create(req, res) {
    console.log("POST /products/create")
    try {
        if (req.body.thumbnails) {
    req.body.thumbnails = [req.body.thumbnails];
} else {
    req.body.thumbnails = [];
}

req.body.status = req.body.status === "on";

        await Product.create(req.body)
        res.redirect("/products")
        
        const products = await Product.find().lean()

        io.emit("productsActualizados", products)

    } catch (error) {
        console.log("Hubo un error")
        res.send({})
    }
}

export function createForm(req, res) {
    console.log("GET - CREATE product")
    res.render("products/create", {error: {}, data: {}})
}

export async function editForm(req, res) {
    console.log("GET - EDIT product")
    const product = await Product.findById(req.params.id).lean()
    res.render("products/edit", {product})
}

export async function update(req, res) {
    console.log("PUT product")
    try{
        req.body.status = req.body.status === "on"
        req.body.thumbnails = req.body.thumbnails ? [req.body.thumbnails] : []
        
        const product= await Product.findByIdAndUpdate(
        req.params.id,
        req.body, {
            runValidators: true,
            new: true,
        } )


        if(!product){
            throw new Error("Product no encontrado")
        }

        const products = await Product.find().lean()

        io.emit("productsActualizados", products)
        res.redirect("/products")

    }catch (error) {
        console.log("Hubo un error")
        res.send({})
    }
}

export async function deleteProduct(req, res) {
    console.log("DELETE product")
    await Product.findByIdAndDelete(req.params.id)

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

    res.redirect("/products")
}

// export async function detailCart(req, res) {
//     console.log("GET carrito")
//     // res.send("Carrito")
//     res.render("products/detail", {
//     product,
//     cid: _id
// })
// }
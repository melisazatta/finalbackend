import Product from "../models/Product.js"
import Cart from "../models/Cart.js";

export async function detailProduct(req, res) {

    const product = await Product.findById(
        req.params.id
    ).lean()

    let cart = await Cart.findOne()

     if (!cart) {
        cart = await Cart.create({
            products: []
        });
    }

    // console.log(carts);

    res.render("products/detail", {
        product,
        cid: cart._id
    })
}

// export async function addProductToCart(req, res) {

//     const { cid, id } = req.params

//     const cart = await Cart.findById(cid)

//     const existingProduct = cart.products.find(
//         p => p.product.toString() === id
//     )

//     if (existingProduct) {

//         existingProduct.cantidad++

//     } else {

//         cart.products.push({
//             product: id,
//             cantidad: 1
//         })

//     }

//     await cart.save()

//     res.redirect(`/cart/${cid}`)
// }
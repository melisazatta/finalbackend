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
    res.render("products/detail", {
        product,
        cid: cart._id
    })
}
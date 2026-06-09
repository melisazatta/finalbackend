import Cart from "../models/Cart.js"

export const loadCart = async (req, res, next) => {

    let cart = await Cart.findOne()

    if (!cart) {
        cart = await Cart.create({
            products: []
        })
    }

    res.locals.cartId = cart._id

    next()
}
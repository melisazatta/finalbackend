import Cart from "../../models/Cart.js"

export async function getCartApi (req, res) {
    console.log("GET carrito")
    const { cid } = req.params;

    const cart = await Cart.findById(cid)
        .populate("products.product")
        .lean()

        if (!cart) {
    return res.status(404).json({
        status: "error",
        message: "Carrito no encontrado"
    });
}
   res.json({
    status: "success",
    payload: cart
});
}

export async function createCartApi(req, res) {
    console.log("POST /cart/create")
    const cart = await Cart.create({
        products: []
    });
    console.log("CARRITO CREADO:", cart);

   res.status(201).json({
    status: "success",
    payload: cart
});
}

export async function addProductApi(req, res) {

    const { cid, pid } = req.params

    const cart = await Cart.findById(cid)

    console.log("CART:", cart);

     if (!cart) {
       return res.status(404).json({
    status: "error",
    message: "Carrito no encontrado"
});
    }

    const existing = cart.products.find(
        p => p.product.toString() === pid
    );

    if (existing) {

        existing.cantidad++

    } else {

        cart.products.push({
            product: pid,
            cantidad: 1
        });

    }

    await cart.save();

    const updatedCart = await Cart.findById(cid);

    console.log("CART GUARDADO:", updatedCart);

    res.json({
    status: "success",
    message: "Producto agregado al carrito",
    payload: updatedCart
});
}

// Delete product de carrito
export async function removeProductApi(req, res) {

    const { cid, pid } = req.params;

    const cart = await Cart.findById(cid);

    if (!cart) {
       return res.status(404).json({
    status: "error",
    message: "Carrito no encontrado"
});
    }

    cart.products = cart.products.filter(
        p => p.product.toString() !== pid
    );

    await cart.save();

    res.json({
    status: "success",
    message: "Producto eliminado del carrito",
    payload: cart

});
}

// Vaciar carrito
export async function clearCartApi(req, res) {

    const { cid } = req.params;

    const cart = await Cart.findById(cid);

    if (!cart) {
       return res.status(404).json({
    status: "error",
    message: "Carrito no encontrado"
});
    }

    cart.products = [];

    await cart.save();

    res.json({
    status: "success",
    message: "Carrito vaciado",
    payload: cart
});
}

// Actualizar cantidad de un product
export async function updateQuantityApi(req, res) {
    
    const { cid, pid } = req.params;
    const { cantidad } = req.body;

    const cart = await Cart.findById(cid);

    if (!cart) {
        return res.status(404).json({
    status: "error",
    message: "Carrito no encontrado"
});
    }

    const product = cart.products.find(
        p => p.product.toString() === pid
    );

    if (!product) {
        return res.status(404).json({
    status: "error",
    message: "Producto no está en el carrito."
})
    }

    product.cantidad = Number(cantidad);

    await cart.save();

    res.json({
    status: "success",
    message: "Cantidad actualizada",
    payload: cart
});
}

export async function updateCartApi(req, res) {

    const { cid } = req.params;

    const { products } = req.body;

    const cart = await Cart.findById(cid);

    if (!cart) {
        return res.status(404).json({
            status: "error",
            message: "Carrito no encontrado"
        });
    }

    cart.products = products;

    await cart.save();

    res.json({
        status: "success",
        payload: cart
    });
}
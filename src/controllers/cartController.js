import Cart from "../models/Cart.js"

export async function getCart (req, res) {
    console.log("GET carrito")
     const cart = await Cart.findById(req.params.id)
        .populate("products.product")
        .lean()

    res.render("cart/detail", {
        cart
    })
}

export async function createCart(req, res) {
    console.log("POST /cart/create")
    const cart = await Cart.create({
        products: []
    });
    console.log("CARRITO CREADO:", cart);

    res.redirect(`/cart/${cart._id}`)
}

export async function addProduct(req, res) {

        console.log("ENTRO A ADD PRODUCT");


    const { cid, pid } = req.params

     console.log("CID:", cid);
    console.log("PID:", pid);

    const cart = await Cart.findById(cid)

    console.log("CART:", cart);

     if (!cart) {
        return res.status(404).send("Carrito no encontrado");
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

    res.redirect(`/cart/${cid}`);
}

// Delete product de carrito
export async function removeProduct(req, res) {

    const { cid, pid } = req.params;

    const cart = await Cart.findById(cid);

    if (!cart) {
        return res.status(404).send("Carrito no encontrado");
    }

    cart.products = cart.products.filter(
        p => p.product.toString() !== pid
    );

    await cart.save();

    res.redirect(`/cart/${cid}`);
}

// Vaciar carrito
export async function clearCart(req, res) {

    const { cid } = req.params;

    const cart = await Cart.findById(cid);

    if (!cart) {
        return res.status(404).send("Carrito no encontrado");
    }

    cart.products = [];

    await cart.save();

    res.redirect(`/cart/${cid}`);
}

// Actualizar cantidad de un product
export async function updateQuantity(req, res) {

    //  console.log("ENTRO A UPDATE QUANTITY");
    // console.log(req.params);
    // console.log(req.body);
    
    const { cid, pid } = req.params;
    const { cantidad } = req.body;

    const cart = await Cart.findById(cid);

    if (!cart) {
        return res.status(404).send("Carrito no encontrado");
    }

    const product = cart.products.find(
        p => p.product.toString() === pid
    );

    if (!product) {
        return res.status(404).send("Product no está en el carrito");
    }

    product.cantidad = Number(cantidad);

    await cart.save();

    res.redirect(`/cart/${cid}`);
}
